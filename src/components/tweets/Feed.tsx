import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { FEED } from '../../graphql/tweets/queries'
import { tweetsState } from '../../state/tweetsState'
import { TweetType } from '../../types/types'
import Tweet from './Tweet'
import TweetForm from './TweetForm'

const Feed = () => {
  const [tweets, setTweets] = useRecoilState(tweetsState)
  const { data, loading, error } = useQuery(FEED)

  useEffect(() => {
    if (data && data.feed && data.feed.length > 0) {
      setTweets(data.feed)
    }
  }, [data])

  if (loading) return <div>Loading...</div>
  return (
    <div className="w-full pb-4 md:pb-0">
      <TweetForm />
      {tweets.length > 0 && (
        <ul>
          {tweets.map((t: TweetType) => (
            <Tweet key={t.id} tweet={t} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Feed
