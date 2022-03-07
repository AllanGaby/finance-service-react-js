import { MapFilterToURLParamsUseCase } from '@/domain/common'
import { HttpClient } from '@/protocols/http-client'

export type ServiceProviderModel = {
  httpClient: HttpClient
  mapFilterToURLParamsUseCase: MapFilterToURLParamsUseCase
  baseUrl: string
}
