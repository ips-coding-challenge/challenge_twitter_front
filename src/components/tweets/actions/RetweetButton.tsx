import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { MdLoop } from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { TOGGLE_RETWEET } from '../../../graphql/tweets/mutations'
import { isRetweetedState, singleTweetState } from '../../../state/tweetsState'
import TweetActionButton from './TweetActionButton'

const RetweetButton = ({ id }: { id: number }) => {
  const setTweet = useSetRecoilState(singleTweetState(id))
  const [isRetweeted, setIsRetweeted] = useRecoilState(isRetweetedState(id))

  const [toggleRetweet, { error }] = useMutation(TOGGLE_RETWEET, {
    variables: {
      tweet_id: id,
    },
    update(cache, { data: { toggleRetweet } }) {
      setIsRetweeted(toggleRetweet.includes('added'))
      setTweet((oldTweet) => {
        if (oldTweet) {
          let count = oldTweet.retweetsCount
          toggleRetweet.includes('added') ? count++ : count--
          return {
            ...oldTweet,
            retweetsCount: count,
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
      isSth={isRetweeted}
      icon={<MdLoop />}
      onClick={() => toggleRetweet()}
      text="Retweet"
      activeText="Retweeted"
      activeClass="green"
    />
  )
}

export default RetweetButton
