import { HttpMethod } from '@/protocols/http-client'

export type HttpRequest<BodyType = any, HeaderType = any> = {
  url: string
  method: HttpMethod
  body?: BodyType
  headers?: HeaderType
}
