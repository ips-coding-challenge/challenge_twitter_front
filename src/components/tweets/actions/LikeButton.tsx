import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { TOGGLE_LIKE } from '../../../graphql/tweets/mutations'
import { isLikedState, singleTweetState } from '../../../state/tweetsState'
import Button from '../../Button'
import TweetActionButton from './TweetActionButton'

const LikeButton = ({ id }: { id: number }) => {
  const [isLiked, setIsLiked] = useRecoilState(isLikedState(id))
  const setTweet = useSetRecoilState(singleTweetState(id))

  const [toggleLike, { error }] = useMutation(TOGGLE_LIKE, {
    variables: {
      tweet_id: id,
    },
    update(cache, { data: { toggleLike } }) {
      setIsLiked(toggleLike.includes('added'))
      setTweet((oldTweet) => {
        if (oldTweet) {
          let count = oldTweet.likesCount
          toggleLike.includes('added') ? count++ : count--
          return {
            ...oldTweet,
            likesCount: count,
          }
        }
      })
    },
  })

  useEffect(() => {
    if (error) {
      console.log('Toggle like error', error)
    }
  }, [error])

  return (
    <TweetActionButton
      id={id}
      isSth={isLiked}
      icon={<MdFavoriteBorder />}
      activeIcon={<MdFavorite />}
      onClick={() => toggleLike()}
      text="Like"
      activeText="Liked"
      activeClass="red"
    />
  )
}

export default LikeButton
