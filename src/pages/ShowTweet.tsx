import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Layout from '../components/Layout'
import BasicLoader from '../components/loaders/BasicLoader'
import Feed from '../components/tweets/Feed'
import Tweet from '../components/tweets/Tweet'
import { COMMENTS, TWEET } from '../graphql/tweets/queries'
import { singleTweetState, tweetsState } from '../state/tweetsState'
import { TweetType } from '../types/types'

const ShowTweet = () => {
  const params: any = useParams()
  // Needed because I use this to get the tweet from the local state for the stats component
  const [tweets, setTweets] = useRecoilState(tweetsState)
  const { data, loading, error } = useQuery(TWEET, {
    variables: {
      tweet_id: +params.id,
    },
  })

  const parent_id = data?.tweet?.id

  const {
    data: comments,
    loading: loadingComments,
    error: errorComments,
  } = useQuery(COMMENTS, {
    skip: !parent_id,
    variables: {
      parent_id: parent_id,
    },
  })

  useEffect(() => {
    if (data && comments) {
      if (comments.comments && comments.comments.length > 0) {
        setTweets([data.tweet, ...comments.comments])
      } else {
        setTweets([].concat(data.tweet))
      }
    }
  }, [comments])

  return (
    <Layout>
      {loading && <BasicLoader />}
      <div className="container max-w-container mx-auto w-full md:w-tweetContainer p-4">
        {/* {singleTweet && <Tweet tweet={singleTweet} />} */}

        {loadingComments && <BasicLoader />}
        {tweets.length > 0 && (
          <ul>
            {tweets.map((t: TweetType, index: number) => {
              return <Tweet key={`${t.id}_${index}`} tweet={t} />
            })}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default ShowTweet
