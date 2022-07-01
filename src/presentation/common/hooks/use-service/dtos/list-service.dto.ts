import { ListEntitiesDTO } from '@/domain/common'
import { CommonServiceDTO } from '@/presentation/common'

export type ListServiceDTO = CommonServiceDTO & {
  filter: ListEntitiesDTO
}
