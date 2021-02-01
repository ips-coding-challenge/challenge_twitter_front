import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { MdBookmarkBorder, MdLoop } from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { TOGGLE_BOOKMARK } from '../../../graphql/tweets/mutations'
import {
  isBookmarkedState,
  isRetweetedState,
  singleTweetState,
} from '../../../state/tweetsState'
import TweetActionButton from './TweetActionButton'

const BookmarkButton = ({ id }: { id: number }) => {
  const setTweet = useSetRecoilState(singleTweetState(id))
  const [isBookmarked, setIsBookmarked] = useRecoilState(isBookmarkedState(id))

  const [toggleBookmark, { error }] = useMutation(TOGGLE_BOOKMARK, {
    variables: {
      tweet_id: id,
    },
    update(cache, { data: { toggleBookmark } }) {
      setIsBookmarked(toggleBookmark.includes('added'))
      setTweet((oldTweet) => {
        if (oldTweet) {
          let count = oldTweet.bookmarksCount
          toggleBookmark.includes('added') ? count++ : count--
          return {
            ...oldTweet,
            bookmarksCount: count,
          }
        }
      })
    },
  })

  useEffect(() => {
    if (error) {
      console.log('Toggle retweet error', error)
    }
  }, [error])

  return (
    <TweetActionButton
      id={id}
      isSth={isBookmarked}
      icon={<MdBookmarkBorder />}
      onClick={() => toggleBookmark()}
      text="Save"
      activeText="Saved"
      activeClass="blue"
    />
  )
}

export default BookmarkButton
