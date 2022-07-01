import { CommonServiceDTO } from '@/presentation/common'

export type GetByIdServiceDTO = CommonServiceDTO & {
  entityId: string
}
