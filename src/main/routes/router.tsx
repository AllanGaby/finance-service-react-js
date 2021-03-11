import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { OpenningRouter } from '@/presentation/routes'
import GlobalStyle from '@/presentation/styles/global.styles'
import { CustomThemeProvider } from '@/presentation/hooks/custom-theme'
import { makeSetCustomThemeUseCase, makeRecoverCustomThemeUseCase } from '@/main/factories/custom-theme/use-cases'

const Router: React.FC = () => {
  return (
    <CustomThemeProvider
      setThemeUseCase={makeSetCustomThemeUseCase()}
      getThemeUseCase={makeRecoverCustomThemeUseCase()} >
      <BrowserRouter>
        <GlobalStyle />
        <OpenningRouter />
      </BrowserRouter>
    </CustomThemeProvider>
  )
}

export default Router
