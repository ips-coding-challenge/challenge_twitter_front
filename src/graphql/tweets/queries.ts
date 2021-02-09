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
