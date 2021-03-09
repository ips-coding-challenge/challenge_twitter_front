import { gql } from '@apollo/client'
import { TWEET_FRAGMENT } from './fragments'

export const FEED = gql`
  query {
    feed {
      ...tweetFragment
      parent {
        ...tweetFragment
      }
    }
  }
  ${TWEET_FRAGMENT}
`

export const TWEETS = gql`
  query($user_id: Float!, $limit: Int, $offset: Int, $filter: Filters) {
    tweets(user_id: $user_id, limit: $limit, offset: $offset, filter: $filter) {
      ...tweetFragment
      parent {
        ...tweetFragment
      }
    }
  }
  ${TWEET_FRAGMENT}
`

export const TWEET = gql`
  query($tweet_id: Float!) {
    tweet(tweet_id: $tweet_id) {
      ...tweetFragment
      parent {
        ...tweetFragment
      }
    }
  }
  ${TWEET_FRAGMENT}
`
export const COMMENTS = gql`
  query($parent_id: Float!) {
    comments(parent_id: $parent_id) {
      ...tweetFragment
      parent {
        ...tweetFragment
      }
    }
  }
  ${TWEET_FRAGMENT}
`
