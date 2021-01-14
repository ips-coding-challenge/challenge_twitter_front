import { ApolloError, gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../components/Input'
import Button from '../components/Button'
import { MdEmail, MdLock, MdPeople } from 'react-icons/md'
import { formatValidationErrors, handleErrors } from '../utils/utils'
import Alert from '../components/Alert'
import { useSetRecoilState } from 'recoil'
import { userState } from '../state/userState'
import { useHistory } from 'react-router-dom'
import { REGISTER } from '../graphql/auth/mutations'
import { registerSchema } from '../validations/auth/schema'

const Register = () => {
  const setUser = useSetRecoilState(userState)

  const [registerMutation, { loading }] = useMutation(REGISTER)
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(registerSchema),
  })
  const [serverErrors, setServerErrors] = useState<any>([])
  const history = useHistory()

  const registerUser = async (formData: any) => {
    setServerErrors([])
    try {
      const res = await registerMutation({
        variables: {
          input: formData,
        },
      })

      const { token, user } = res.data.register

      localStorage.setItem('token', token)
      setUser(user)
      history.push('/')
    } catch (e) {
      setServerErrors(handleErrors(e))
    }
  }

  return (
    <div className="w-full p-4 md:w-authContainer md:mx-auto h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-4 font-bold">Register</h1>
      <form className="w-full" onSubmit={handleSubmit(registerUser)}>
        {serverErrors.length > 0 && (
          <div className="mb-4">
            {serverErrors.map((e: any) => (
              <Alert variant="danger" message={e.message} />
            ))}
          </div>
        )}
        <Input
          label="Enter your username"
          name="username"
          icon={<MdPeople />}
          ref={register}
          error={errors.username?.message}
        />

        <Input
          label="Enter your Display Name"
          name="display_name"
          icon={<MdPeople />}
          ref={register}
          error={errors.display_name?.message}
        />

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
          text="Register"
          variant="primary"
        />
      </form>
    </div>
  )
}

export default Register
