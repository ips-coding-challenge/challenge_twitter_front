import { gql } from '@apollo/client'

export const REGISTER = gql`
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
