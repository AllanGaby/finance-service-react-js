import { CommonServiceDTO } from '@/presentation/common'

export type DeleteByIdServiceDTO<DTOType = undefined> = CommonServiceDTO & {
  entityId: string
  data?: DTOType
}
