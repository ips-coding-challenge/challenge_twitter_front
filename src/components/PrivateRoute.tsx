import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../state/userState'

type PrivateRouteProps = {
  children: React.ReactNode
} & RouteProps

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const user = useRecoilValue(userState)

  return (
    <Route
      {...rest}
      render={() =>
        user ? children : <Redirect to={{ pathname: '/login' }} />
      }
    />
  )
}

export default PrivateRoute
