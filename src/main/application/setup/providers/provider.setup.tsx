import React from 'react'
import { LocalStorageProvider, ServiceProvider } from '@/presentation/common/hooks'
import { makeMapFilterToURLParamsUseCase, makeRecoverValueInStorageUseCase, makeSetValueInStorageUseCase } from '@/main/factories/common/use-cases'
import { HttpClientFactory } from '@/infrastructure/http-client'

type AppProviderModel = {
  children?: JSX.Element
}

export const ProviderSetupFactory: React.FC<AppProviderModel> = ({ children }: AppProviderModel) => (
  <ServiceProvider
    httpClient={HttpClientFactory.GetHttpClient()}
    mapFilterToURLParamsUseCase={makeMapFilterToURLParamsUseCase()}
    baseUrl=''
  >
    <LocalStorageProvider
      recoverValueInStorageUseCase={makeRecoverValueInStorageUseCase()}
      setValueInStorageUseCase={makeSetValueInStorageUseCase()}
    >
      {children}
    </LocalStorageProvider>
  </ServiceProvider>
)
