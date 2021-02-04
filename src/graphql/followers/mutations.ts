import { gql } from '@apollo/client'

export const TOGGLE_FOLLOW = gql`
  mutation($following_id: Float!) {
    toggleFollow(following_id: $following_id)
  }
`
