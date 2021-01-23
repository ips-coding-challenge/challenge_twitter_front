import { gql } from '@apollo/client'

export const TOGGLE_LIKE = gql`
  mutation($tweet_id: Float!) {
    toggleLike(tweet_id: $tweet_id)
  }
`
