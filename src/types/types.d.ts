export type TweetType = {
  id: number
  body: string
  user: UserType
  isLiked?: boolean
  likesCount: number
  commentsCount: number
  retweetsCount: number
  type: 'tweet' | 'retweet' | 'comment'
  parent: TweetType
  media?: string
  visibility: 'public' | 'follower'
  created_at: string
  updated_at: string
}

export type UserType = {
  id: number
  username: string
  display_name: string
  avatar?: string
}
