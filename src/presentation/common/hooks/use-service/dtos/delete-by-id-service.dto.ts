import { CommonServiceDTO } from '@/presentation/common/hooks'

export type DeleteByIdServiceDTO<DTOType = undefined> = CommonServiceDTO & {
  entityId: string
  data?: DTOType
}
