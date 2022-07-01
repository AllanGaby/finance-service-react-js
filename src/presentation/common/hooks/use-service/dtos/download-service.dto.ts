import { CommonServiceDTO } from '@/presentation/common/hooks'
import { HttpContentType } from '@/protocols/http-client'

export type DownloadServiceDTO = CommonServiceDTO & {
  entityId?: number
  contentType: HttpContentType
}
