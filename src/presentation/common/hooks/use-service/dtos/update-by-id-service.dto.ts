import { HttpMethod } from '@/protocols/http-client'
import { CommonServiceDTO } from '@/presentation/common/hooks'

export type UpdateByIdServiceDTO<DTOType> = CommonServiceDTO & {
  data: DTOType
  method?: HttpMethod
  entityId: string
}
