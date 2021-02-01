export type TweetType = {
  id: number
  body: string
  user: UserType
  isLiked: boolean
  isRetweeted: boolean
  isBookmarked: boolean
  likesCount: number
  commentsCount: number
  retweetsCount: number
  bookmarksCount: number
  preview: PreviewType
  type: 'tweet' | 'retweet' | 'comment'
  parent?: TweetType
  media?: string
  visibility: 'public' | 'follower'
  created_at: string
  updated_at: string
}

export type UserType = {
  id: number
  username: string
  display_name: string
  email?: string
  avatar?: string
}

export type PreviewType = {
  id: number
  title: string
  url: string
  description?: string
  image?: string
}

export type HashtagType = {
  id: number
  hashtag: string
  tweetsCount?: number
}
