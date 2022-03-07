import React, { useMemo } from 'react'
import { AppRouteModel } from '@/main/application/models'
import { OpenningRoutes } from '@/main/factories/home/routes'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Redirect, Route } from 'react-router'

export const RoutesSetupFactory: React.FC = () => {
  const routes: AppRouteModel[] = [...OpenningRoutes]

  const handleRoutes = useMemo(() =>
    <>
      {routes.map((route, index) =>
        <Route
          key={`${route.path.toString()}-${index}`}
          path={route.path}
          exact={route.exact}
          component={route.component}/>
      )}
    </>
  , [])

  const handleOpenRoutesRoutes = useMemo(() =>
    <>
      <Switch>
        {handleRoutes}
      </Switch>
      <Redirect to='/home'/>
    </>
  , [])

  return (
    <BrowserRouter>
      {handleOpenRoutesRoutes}
    </BrowserRouter>
  )
}
