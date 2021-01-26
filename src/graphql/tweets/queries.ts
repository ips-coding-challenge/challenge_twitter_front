import { gql } from '@apollo/client'
import { TWEET_FRAGMENT } from './fragments'

export const FEED = gql`
  query {
    feed {
      ...tweetFragment
    }
  }
  ${TWEET_FRAGMENT}
`
