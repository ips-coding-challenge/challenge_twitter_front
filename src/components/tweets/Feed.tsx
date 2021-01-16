import { useQuery } from '@apollo/client'
import React from 'react'
import { FEED } from '../../graphql/tweets/queries'
import { TweetType } from '../../types/types'
import Tweet from './Tweet'

const Feed = () => {
  const { data, loading, error } = useQuery(FEED)

  if (loading) return <div>Loading...</div>
  return (
    <div className="w-full">
      {data && data.feed.length > 0 && (
        <ul>
          {data.feed.map((t: TweetType) => (
            <Tweet tweet={t} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Feed
