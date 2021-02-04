import { gql } from '@apollo/client'

export const USERSTOFOLLOW = gql`
  query {
    followersSuggestions {
      id
      username
      display_name
      bio
      avatar
      banner
      followersCount
    }
  }
`
