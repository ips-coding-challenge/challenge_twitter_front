import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdEmail, MdLock, MdPeople } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { REGISTER } from '../graphql/auth/mutations'
import { userState } from '../state/userState'
import { handleErrors } from '../utils/utils'
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
    <Layout>
      <div className="w-full md:w-authContainer h-full container mx-auto p-4 flex flex-col justify-center items-center">
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
    </Layout>
  )
}

export default Register
