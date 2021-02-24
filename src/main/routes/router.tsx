import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { OpenningRouter } from '@/presentation/routes'
import GlobalStyle from '@/presentation/styles/global.styles'
import { ThemeProvider } from 'styled-components'
import { DarkTheme } from '@/presentation/styles/themes'

const Router: React.FC = () => {
  return (
    <ThemeProvider theme={DarkTheme} >
      <BrowserRouter>
        <GlobalStyle />
        <OpenningRouter />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Router
