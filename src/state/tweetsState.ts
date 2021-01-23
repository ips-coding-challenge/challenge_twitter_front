import { atom, atomFamily, selectorFamily } from 'recoil'
import { TweetType } from '../types/types'

export const tweetsState = atom<TweetType[]>({
  key: 'tweetsState',
  default: [],
})

export const singleTweetState = atomFamily<TweetType | undefined, number>({
  key: 'singleTweetState',
  default: selectorFamily<TweetType | undefined, number>({
    key: 'singleTweetSelector',
    get: (id: number) => ({ get }) => {
      return get(tweetsState).find((t) => t.id === id)
    },
  }),
})

export const isLikedState = atomFamily({
  key: 'isLikedTweet',
  default: selectorFamily({
    key: 'isLikedSelector',
    get: (id: number) => ({ get }) => {
      return get(singleTweetState(id))?.isLiked
    },
  }),
})
