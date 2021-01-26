import { gql } from '@apollo/client'
import { TWEET_FRAGMENT } from './fragment'

export const FEED = gql`
  query {
    feed {
      ...tweetFragment
    }
  }
  ${TWEET_FRAGMENT}
`
