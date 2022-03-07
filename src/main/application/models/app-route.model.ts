import { RouteProps } from 'react-router-dom'

export type AppRouteModel = RouteProps & {
  authenticated?: boolean
}
