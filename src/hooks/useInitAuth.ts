import { useLazyQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ME } from '../graphql/auth/queries'
import { userState } from '../state/userState'

export const useInitAuth = () => {
  const [user, setUser] = useRecoilState(userState)
  const [init, setInit] = useState(true)
  const [me, { data, loading, error }] = useLazyQuery(ME)

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token')
    // If I have a token, I fetch the user
    // else I stop here and redirect to the login page
    if (token) {
      me()
    } else {
      setInit(false)
    }
  }, [])

  // Launch the fetchUser function when the component is mounted
  useEffect(() => {
    fetchUser()
  }, [])

  // If I receive data from the "me" query, I set the user
  useEffect(() => {
    if (data) {
      setUser(data.me)
    }
  }, [data])

  // I check if the user is set before redirecting to avoid ui to flicker.
  // setState being asynchrone
  useEffect(() => {
    if (user) {
      setInit(false)
    }
  }, [user])

  // If I receive an error, I remove the token from the localStorage
  // and it will then be handle by the PrivateRoute/PublicRoute component
  useEffect(() => {
    if (error) {
      localStorage.removeItem('token')
      setUser(null)
      setInit(false)
    }
  }, [error])

  return { init }
}
