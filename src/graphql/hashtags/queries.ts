import { gql } from '@apollo/client'

export const HASHTAGS = gql`
  query {
    trendingHashtags {
      id
      hashtag
      tweetsCount
    }
  }
`
