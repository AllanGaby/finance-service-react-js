import { CommonServiceDTO } from '@/presentation/common/hooks'

export type CreateServiceDTO<DTOType> = CommonServiceDTO & {
  data: DTOType
}
