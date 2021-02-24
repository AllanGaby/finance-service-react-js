import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { OpenningRouter } from '@/presentation/routes'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <OpenningRouter />
    </BrowserRouter>
  )
}

export default Router
