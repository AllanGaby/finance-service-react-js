import { ListEntitiesDTO } from '@/domain/common'
import { CommonServiceDTO } from '@/presentation/common/hooks'

export type ListServiceDTO = CommonServiceDTO & {
  filter: ListEntitiesDTO
}
