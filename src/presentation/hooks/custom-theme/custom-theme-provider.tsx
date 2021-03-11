import React, { createContext, PropsWithChildren, useContext, useState, useCallback, useEffect } from 'react'
import { RecoverCustomThemeUseCase, SetCustomThemeUseCase, ThemeModel } from '@/domain/custom-theme'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { DarkTheme, LightTheme } from '@/presentation/styles/themes'

type CustomThemeContextData = {
  customTheme: ThemeModel
  toggleTheme: () => void
}

const CustomThemeContext = createContext<CustomThemeContextData>({
  customTheme: undefined,
  toggleTheme: undefined
})

type CustomThemeProviderProps = {
  setThemeUseCase: SetCustomThemeUseCase
  getThemeUseCase: RecoverCustomThemeUseCase
}

type CustomThemeProviderPropsWithChildren = PropsWithChildren<CustomThemeProviderProps>

const CustomThemeProvider: React.FC<CustomThemeProviderPropsWithChildren> = ({ getThemeUseCase, setThemeUseCase, children }: CustomThemeProviderPropsWithChildren) => {
  const [customTheme, setCustomThemeState] = useState<ThemeModel>()
  const [theme, setTheme] = useState<DefaultTheme>()

  useEffect(() => {
    const getCustomThemeStateAsync = async (): Promise<void> => {
      const theme = await getThemeUseCase.getTheme()
      setCustomThemeState(theme)
      if (theme === ThemeModel.dark) {
        setTheme(DarkTheme)
      } else {
        setTheme(LightTheme)
      }
    }
    getCustomThemeStateAsync()
  }, [])

  const handleToggleTheme = useCallback(async () => {
    const selectedTheme = await getThemeUseCase.getTheme()
    if (selectedTheme === ThemeModel.dark) {
      setCustomThemeState(ThemeModel.light)
      await setThemeUseCase.setTheme(ThemeModel.light)
      setTheme(LightTheme)
    } else {
      setCustomThemeState(ThemeModel.dark)
      await setThemeUseCase.setTheme(ThemeModel.dark)
      setTheme(DarkTheme)
    }
  }, [])

  return (
    <CustomThemeContext.Provider value={{ customTheme, toggleTheme: handleToggleTheme }}>
      {theme &&
      <ThemeProvider theme={theme} >
        {children}
      </ThemeProvider>}
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
