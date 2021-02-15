import { gql } from '@apollo/client'

export const USER = gql`
  query($username: String!) {
    user(username: $username) {
      id
      username
      display_name
      avatar
      banner
      bio
      followersCount
      followingsCount
    }
  }
`
