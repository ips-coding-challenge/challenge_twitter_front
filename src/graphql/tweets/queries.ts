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
