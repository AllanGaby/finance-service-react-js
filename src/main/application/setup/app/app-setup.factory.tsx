import React from 'react'
import { GlobalStyle, DarkTheme } from '@/presentation/common/styles'
import { RoutesSetupFactory, ProviderSetupFactory } from '@/main/application/setup'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

export const AppSetupFactory: React.FC = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <ProviderSetupFactory>
          <RoutesSetupFactory />
        </ProviderSetupFactory>
      </BrowserRouter>
    </ThemeProvider>
  )
}
