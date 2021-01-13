import { gql, useMutation } from '@apollo/client'
import React from 'react'

const REGISTER = gql`
  mutation($input: RegisterPayload!) {
    register(input: $input) {
      token
      user {
        id
        username
        display_name
        email
        created_at
        updated_at
      }
    }
  }
`

const Register = () => {
  const [register, { loading, data, error }] = useMutation(REGISTER)

  return (
    <div>
      <button
        onClick={() => {
          register({
            variables: {
              input: {
                username: 'new',
                email: 'new@test.fr',
                display_name: 'New',
                password: 'password',
              },
            },
          })
        }}
      >
        Register
      </button>
      {loading && <div>Loading...</div>}
      {data && <div>{data.register.user.username}</div>}
    </div>
  )
}

export default Register
