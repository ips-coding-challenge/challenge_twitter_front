import { gql } from '@apollo/client'

export const FEED = gql`
  query {
    feed {
      id
      body
      visibility
      likesCount
      retweetsCount
      commentsCount
      parent {
        id
        body
        user {
          id
          username
          display_name
          avatar
        }
      }
      preview {
        id
        title
        description
        url
        image
      }
      isLiked
      type
      visibility
      user {
        id
        username
        display_name
        avatar
      }
      created_at
    }
  }
`
