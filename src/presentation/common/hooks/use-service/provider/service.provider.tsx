import React, { createContext, useContext, PropsWithChildren, useCallback } from 'react'
import { ListEntityModel } from '@/domain/common'
import { HttpMethod, HttpStatusCode } from '@/protocols/http-client'
import { ConflictError, EntityNotFoundError, UnauthorizedError, UnexpectedError, UnprocessableEntityError } from '@/data/common/errors'
import {
  ServiceContextModel,
  ServiceProviderModel,
  CreateServiceDTO,
  DeleteByIdServiceDTO,
  GetByIdServiceDTO,
  UpdateByIdServiceDTO,
  ListServiceDTO
} from '@/presentation/common/hooks'

const ServiceContext = createContext<ServiceContextModel>({
  create: undefined,
  deleteById: undefined,
  getById: undefined,
  list: undefined,
  updateById: undefined
})

export type ServiceProviderPropsWithChildren = PropsWithChildren<ServiceProviderModel>

const ServiceProvider: React.FC<ServiceProviderPropsWithChildren> = ({ children, httpClient, mapFilterToURLParamsUseCase, baseUrl }: ServiceProviderPropsWithChildren) => {
  const handleCreate = useCallback(async <EntityType extends Object, DTOType>(params: CreateServiceDTO<DTOType>): Promise<EntityType> => {
    const { endPoint, data, entityName } = params
    const response = await httpClient.request<EntityType>({
      method: HttpMethod.post,
      url: `${baseUrl}${endPoint}`,
      body: data
    })
    switch (response.statusCode) {
      case HttpStatusCode.created:
        return response.body
      case HttpStatusCode.noContent:
        return undefined
      case HttpStatusCode.conflict:
        throw new ConflictError(entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }, [])

  const handleDeleteById = useCallback(async <DTOType extends Object>(params: DeleteByIdServiceDTO<DTOType>): Promise<void> => {
    const { endPoint, data, entityName, entityId } = params
    const response = await httpClient.request({
      method: HttpMethod.delete,
      url: `${baseUrl}${endPoint}/${entityId}`,
      body: data
    })
    switch (response.statusCode) {
      case HttpStatusCode.noContent:
        return undefined
      case HttpStatusCode.conflict:
        throw new ConflictError(entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }, [])

  const handleUpdateById = useCallback(async <EntityType extends Object, DTOType>(params: UpdateByIdServiceDTO<DTOType>): Promise<EntityType> => {
    const { method = HttpMethod.put, endPoint, data, entityName, entityId } = params
    const response = await httpClient.request<EntityType>({
      method,
      url: `${baseUrl}${endPoint}/${entityId}`,
      body: data
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.noContent:
        return undefined
      case HttpStatusCode.conflict:
        throw new ConflictError(entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }, [])

  const handleList = useCallback(async <EntityType extends Object>(params: ListServiceDTO): Promise<ListEntityModel<EntityType>> => {
    const { endPoint, filter } = params
    const urlParams = mapFilterToURLParamsUseCase.map(filter)
    const response = await httpClient.request<ListEntityModel<EntityType>>({
      method: HttpMethod.get,
      url: `${baseUrl}${endPoint}${urlParams}`,
      body: undefined
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.noContent:
        return undefined
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }, [])

  const handleGetById = useCallback(async <EntityType extends Object>(params: GetByIdServiceDTO): Promise<EntityType> => {
    const { endPoint, entityName, entityId } = params
    const response = await httpClient.request<EntityType>({
      method: HttpMethod.get,
      url: `${baseUrl}${endPoint}/${entityId}`,
      body: undefined
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.noContent:
        return undefined
      case HttpStatusCode.notFound:
        throw new EntityNotFoundError(entityName)
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError(response.body)
      case HttpStatusCode.unprocessableEntity:
        throw new UnprocessableEntityError(response.body)
      default:
        throw new UnexpectedError(response.body)
    }
  }, [])

  return (
    <ServiceContext.Provider
      value={{
        create: handleCreate,
        updateById: handleUpdateById,
        list: handleList,
        deleteById: handleDeleteById,
        getById: handleGetById
      }}>
      {children}
    </ServiceContext.Provider>
  )
}

const useService = (): ServiceContextModel => {
  const context = useContext(ServiceContext)

  if (!context) {
    throw new Error('useService must be used within a ServiceProvider')
  }

  return context
}

export { ServiceProvider, useService }
