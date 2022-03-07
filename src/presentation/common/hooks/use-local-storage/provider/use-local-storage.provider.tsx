import React, { createContext, useContext, PropsWithChildren, useCallback } from 'react'
import { LocalStorageProviderModel, LocalStorageContextModel } from '@/presentation/common/hooks'

const LocalStorageContext = createContext<LocalStorageContextModel>({
  addLocalStorageValue: undefined,
  recoverLocalStorageValue: undefined
})

type LocalStorageProviderModelWithChildren = PropsWithChildren<LocalStorageProviderModel>

const LocalStorageProvider: React.FC<LocalStorageProviderModelWithChildren> = ({
  setValueInStorageUseCase,
  recoverValueInStorageUseCase,
  children
}: LocalStorageProviderModelWithChildren) => {
  const addLocalStorageValue = useCallback(async <ValueType extends undefined>(key: string, data: ValueType): Promise<ValueType> => {
    return setValueInStorageUseCase.setValue<ValueType>(key, data)
  }, [setValueInStorageUseCase])

  const recoverLocalStorageValue = useCallback(async <ValueType extends undefined>(key: string): Promise<ValueType> => {
    const recoverValue = await recoverValueInStorageUseCase.recoverValue<ValueType>(key)
    return JSON.parse(recoverValue)
  }, [recoverValueInStorageUseCase])

  return (
    <LocalStorageContext.Provider value={{
      addLocalStorageValue: addLocalStorageValue,
      recoverLocalStorageValue: recoverLocalStorageValue
    }}>
      {children}
    </LocalStorageContext.Provider>
  )
}

const useLocalStorage = (): LocalStorageContextModel => {
  const context = useContext(LocalStorageContext)

  if (!context) {
    throw new Error('useLocalStorage must be used within a LocalStorageProvider')
  }

  return context
}

export { LocalStorageProvider, useLocalStorage }
