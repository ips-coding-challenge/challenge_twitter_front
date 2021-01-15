import { ApolloError, useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdPeople, MdEmail, MdLock } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { LOGIN } from '../graphql/auth/mutations'
import { userState } from '../state/userState'
import { handleErrors } from '../utils/utils'
import { loginSchema } from '../validations/auth/schema'

const Login = () => {
  const setUser = useSetRecoilState(userState)

  const [loginMutation, { loading }] = useMutation(LOGIN)
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const [serverErrors, setServerErrors] = useState<any>([])
  const history = useHistory()

  const loginUser = async (formData: any) => {
    console.log('formData', formData)
    setServerErrors([])
    try {
      const res = await loginMutation({
        variables: {
          input: formData,
        },
      })

      const { token, user } = res.data.login

      localStorage.setItem('token', token)
      setUser(user)
      history.push('/')
    } catch (e) {
      if (e instanceof ApolloError) {
        setServerErrors(handleErrors(e))
      }
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl mb-4 font-bold">Login</h1>
      <form className="w-full" onSubmit={handleSubmit(loginUser)}>
        {serverErrors.length > 0 && (
          <div className="mb-4">
            {serverErrors.map((e: any) => (
              <Alert variant="danger" message={e.message} />
            ))}
          </div>
        )}

        <Input
          label="Enter your email"
          name="email"
          type="email"
          icon={<MdEmail />}
          ref={register}
          error={errors.email?.message}
        />

        <Input
          label="Enter your password"
          name="password"
          type="password"
          icon={<MdLock />}
          ref={register}
          error={errors.password?.message}
        />

        <Button
          disabled={loading}
          type="submit"
          text="Login"
          variant="primary"
        />
      </form>
    </Layout>
  )
}

export default Login
