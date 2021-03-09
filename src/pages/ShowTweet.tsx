import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Layout from '../components/Layout'
import BasicLoader from '../components/loaders/BasicLoader'
import Feed from '../components/tweets/Feed'
import Tweet from '../components/tweets/Tweet'
import { COMMENTS, TWEET } from '../graphql/tweets/queries'
import { singleTweetState } from '../state/tweetsState'
import { TweetType } from '../types/types'

const ShowTweet = () => {
  const params: any = useParams()
  const [singleTweet, setSingleTweet] = useRecoilState(
    singleTweetState(+params.id)
  )
  const { data, loading, error } = useQuery(TWEET, {
    variables: {
      tweet_id: +params.id,
    },
  })

  const [
    getComments,
    { data: comments, loading: loadingComments, error: errorComments },
  ] = useLazyQuery(COMMENTS)

  useEffect(() => {
    if (data) {
      console.log('data', data)
      setSingleTweet(data.tweet)
      getComments({ variables: { parent_id: +data.tweet.id } })
    }
  }, [data])

  return (
    <Layout>
      {loading && <BasicLoader />}
      <div>
        {singleTweet && <Tweet tweet={singleTweet} />}

        {loadingComments && <BasicLoader />}
        {comments && (
          <ul>
            {comments.comments.map((t: TweetType) => {
              return <Tweet key={t.id} tweet={t} showStats={false} />
            })}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default ShowTweet
