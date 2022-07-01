import { RequestValidatorSpy } from '@/protocols/request-validator'
import { RequestValidatorProviderProps } from '@/presentation/common/hooks'

export const mockRequestValidatorProviderProps = (): RequestValidatorProviderProps => ({
  requestValidator: new RequestValidatorSpy()
})
