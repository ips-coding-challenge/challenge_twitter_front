import { gql } from '@apollo/client'

export const ADD_TWEET = gql`
  mutation($payload: AddTweetPayload!) {
    addTweet(payload: $payload) {
      id
      body
      likesCount
      retweetsCount
      commentsCount
      isLiked
      user {
        id
        username
        display_name
        avatar
      }
      created_at
      updated_at
    }
  }
`

export const TOGGLE_LIKE = gql`
  mutation($tweet_id: Float!) {
    toggleLike(tweet_id: $tweet_id)
  }
`
