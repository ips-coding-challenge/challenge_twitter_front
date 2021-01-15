import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../state/userState'

type PublicRouteProps = {
  children: React.ReactNode
} & RouteProps

const PublicRoute = ({ children, ...rest }: PublicRouteProps) => {
  const user = useRecoilValue(userState)

  return (
    <Route
      {...rest}
      render={() => (!user ? children : <Redirect to={{ pathname: '/' }} />)}
    />
  )
}

export default PublicRoute
