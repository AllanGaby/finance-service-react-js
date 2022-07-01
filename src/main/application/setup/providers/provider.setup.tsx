import React from 'react'
import {
  ToastProvider,
  AlertProvider,
  AuthenticationProvider,
  ServiceProvider,
  RequestValidatorProvider,
  LocalStorageProvider
} from '@/presentation/common'
import {
  makeMapFilterToURLParamsUseCase,
  makeRecoverValueInStorageUseCase,
  makeSetValueInStorageUseCase,
  makeCreateAccessSessionUseCase,
  makeDeleteAccessSessionUseCase,
  makeRecoverAccessSessionUseCase
} from '@/main/factories/common'
import { configurationSetup } from '@/main/application'
import { HttpClientFactory } from '@/infrastructure/http-client'
import { RequestValidatorFactory } from '@/infrastructure/request-validator'

type AppProviderModel = {
  children?: JSX.Element
}

export const ProviderSetupFactory: React.FC<AppProviderModel> = ({ children }: AppProviderModel) => {
  const config = configurationSetup()
  return (
    <ToastProvider>
      <AlertProvider>
        <LocalStorageProvider
          recoverValueInStorageUseCase={makeRecoverValueInStorageUseCase()}
          setValueInStorageUseCase={makeSetValueInStorageUseCase()}
        >
          <AuthenticationProvider
            accessTokenKey={config.accessTokenKey}
            createAccessSessionUseCase={makeCreateAccessSessionUseCase({
              accessSessionURL: `${config.baseURL}/authentication/access-session`,
              publicKey: config.publicKey
            })}
            deleteAccessSessionUseCase={makeDeleteAccessSessionUseCase({
              accessSessionURL: `${config.baseURL}/authentication/access-session`,
              accessTokenKey: config.accessTokenKey,
              accessTokenName: config.accessTokenName
            })}
            recoverAccessSessionUseCase={makeRecoverAccessSessionUseCase({
              accessSessionURL: `${config.baseURL}/authentication/access-session`,
              accessTokenKey: config.accessTokenKey,
              accessTokenName: config.accessTokenName
            })}
          >
            <ServiceProvider
              httpClient={HttpClientFactory.GetHttpAuthenticatedClient({
                accessTokenKey: config.accessTokenKey,
                accessTokenName: config.accessTokenName,
                getAccessTokenUseCase: makeRecoverValueInStorageUseCase()
              })}
              mapFilterToURLParamsUseCase={makeMapFilterToURLParamsUseCase()}
              baseUrl={config.baseURL}
            >
              <RequestValidatorProvider
                requestValidator={RequestValidatorFactory.GetRequestValidatorAdaper()}
              >
                {children}
              </RequestValidatorProvider>
            </ServiceProvider>
          </AuthenticationProvider>
        </LocalStorageProvider>
      </AlertProvider>
    </ToastProvider>
  )
}
