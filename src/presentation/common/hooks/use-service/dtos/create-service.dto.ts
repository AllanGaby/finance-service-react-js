import { CommonServiceDTO } from '@/presentation/common'

export type CreateServiceDTO<DTOType> = CommonServiceDTO & {
  data: DTOType
}
