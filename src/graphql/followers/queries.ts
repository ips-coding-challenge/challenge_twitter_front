import { gql } from '@apollo/client'

export const USERS_TO_FOLLOW = gql`
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
