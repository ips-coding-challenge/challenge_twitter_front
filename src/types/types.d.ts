export type TweetType = {
  id: number
  body: string
  user: UserType
  isLiked: boolean
  isRetweeted: boolean
  isBookmarked: boolean
  likeAuthor?: LikeOrRetweetAuthorType
  retweetAuthor?: LikeOrRetweetAuthorType
  likesCount: number
  commentsCount: number
  retweetsCount: number
  bookmarksCount: number
  preview: PreviewType
  type: 'tweet' | 'retweet' | 'comment'
  parent?: TweetType
  media?: MediaType
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
  banner?: string
  bio?: string
  followersCount?: number
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

export type MediaType = {
  id: number
  url: string
}

export type LikeOrRetweetAuthorType = {
  username: string
  display_name: string
}
