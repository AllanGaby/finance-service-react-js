import { CommonServiceDTO } from '@/presentation/common/hooks'

export type GetByIdServiceDTO = CommonServiceDTO & {
  entityId: string
}
