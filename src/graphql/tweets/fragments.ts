import { gql } from '@apollo/client'

export const PREVIEW_FRAGMENT = gql`
  fragment previewFragment on Tweet {
    preview {
      id
      title
      description
      url
      image
    }
  }
`

export const USER_FRAGMENT = gql`
  fragment userFragment on Tweet {
    user {
      id
      username
      display_name
      avatar
    }
  }
`

export const TWEET_FRAGMENT = gql`
  fragment tweetFragment on Tweet {
    id
    body
    visibility
    likesCount
    retweetsCount
    commentsCount
    bookmarksCount
    likeAuthor {
      username
      display_name
    }
    retweetAuthor {
      username
      display_name
    }
    media {
      id
      url
    }
    ...previewFragment
    tweetUserInfos {
      isLiked
      isRetweeted
      isBookmarked
    }
    type
    visibility
    ...userFragment
    created_at
  }
  ${PREVIEW_FRAGMENT}
  ${USER_FRAGMENT}
`
