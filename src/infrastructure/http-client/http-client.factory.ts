import { AxiosHttpClient } from './axios'
import { HttpClient } from '@/protocols/http-client'

export class HttpClientFactory {
  public static GetHttpClient (): HttpClient {
    return new AxiosHttpClient()
  }
}
