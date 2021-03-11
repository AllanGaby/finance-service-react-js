import React, { createContext, PropsWithChildren, useContext, useState, useCallback } from 'react'
import { RecoverCustomThemeUseCase, SetCustomThemeUseCase, ThemeModel } from '@/domain/custom-theme'

type CustomThemeContextData = {
  customTheme: ThemeModel
  setCustomTheme: (theme: ThemeModel) => void
}

const CustomThemeContext = createContext<CustomThemeContextData>({
  customTheme: undefined,
  setCustomTheme: undefined
})

type CustomThemeProviderProps = {
  setThemeUseCase: SetCustomThemeUseCase
  getThemeUseCase: RecoverCustomThemeUseCase
}

type CustomThemeProviderPropsWithChildren = PropsWithChildren<CustomThemeProviderProps>

const CustomThemeProvider: React.FC<CustomThemeProviderPropsWithChildren> = ({ getThemeUseCase, setThemeUseCase, children }: CustomThemeProviderPropsWithChildren) => {
  const [customTheme, setCustomThemeState] = useState<ThemeModel>()

  const handleSetCustomTheme = useCallback(async (theme: ThemeModel) => {
    setCustomThemeState(theme)
    await setThemeUseCase.setTheme(theme)
  }, [])

  return (
    <CustomThemeContext.Provider value={{ customTheme, setCustomTheme: handleSetCustomTheme }}>
      {children}
    </CustomThemeContext.Provider>)
}

const useCustomTheme = (): CustomThemeContextData => {
  const context = useContext(CustomThemeContext)

  if (!context) {
    throw new Error('useCustomTheme must be used within an CustomThemeProvider')
  }

  return context
}

export { CustomThemeProvider, useCustomTheme }
