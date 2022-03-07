import { HttpRequest, HttpResponse } from '@/protocols/http-client'

export interface HttpClient {
  request: <ResponseBodyType = any>(data: HttpRequest) => Promise<HttpResponse<ResponseBodyType>>
}
