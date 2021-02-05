import { gql } from '@apollo/client'

export const ME = gql`
  query {
    me {
      id
      username
      display_name
      avatar
      email
      created_at
      updated_at
    }
  }
`
