import { gql } from '@apollo/client'
import { TWEET_FRAGMENT } from './fragment'

export const ADD_TWEET = gql`
  mutation($payload: AddTweetPayload!) {
    addTweet(payload: $payload) {
      ...tweetFragment
    }
  }
  ${TWEET_FRAGMENT}
`

export const TOGGLE_LIKE = gql`
  mutation($tweet_id: Float!) {
    toggleLike(tweet_id: $tweet_id)
  }
`
