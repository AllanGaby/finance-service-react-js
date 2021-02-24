import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { OpenningRouter } from '@/presentation/routes'
import GlobalStyle from '@/presentation/styles/global.styles'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <OpenningRouter />
    </BrowserRouter>
  )
}

export default Router
