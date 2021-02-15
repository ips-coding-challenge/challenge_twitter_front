import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Layout from '../components/Layout'
import BasicLoader from '../components/loaders/BasicLoader'
import MyImage from '../components/MyImage'
import Banner from '../components/profile/Banner'
import UserInfos from '../components/profile/UserInfos'
import Comments from '../components/tweets/Comments'
import Feed from '../components/tweets/Feed'
import Tweet from '../components/tweets/Tweet'
import { TWEETS } from '../graphql/tweets/queries'
import { USER } from '../graphql/users/queries'
import { tweetsState } from '../state/tweetsState'
import { TweetType, UserType } from '../types/types'

const Profile = () => {
  const [tweets, setTweets] = useRecoilState(tweetsState)

  const [user, setUser] = useState<UserType | null>(null)
  const [filter, setFilter] = useState('TWEETS_RETWEETS')

  const params: any = useParams()
  const { data, loading, error } = useQuery(USER, {
    variables: {
      username: params.username,
    },
  })

  const [
    fetchTweets,
    { data: tweetsData, loading: tweetsLoading, error: tweetsError },
  ] = useLazyQuery(TWEETS)

  useEffect(() => {
    if (data) {
      setUser(data.user)
      fetchTweets({
        variables: {
          user_id: data.user.id,
        },
      })
    }
  }, [data])

  useEffect(() => {
    if (tweetsData) {
      setTweets(() => tweetsData.tweets)
    }
  }, [tweetsData])

  useEffect(() => {
    console.log('filter changed')
    if (data && filter) {
      fetchTweets({
        variables: {
          user_id: data.user.id,
          filter,
        },
      })
    }
  }, [filter, data])

  return (
    <Layout>
      {loading && <BasicLoader />}
      {data ? (
        <div>
          {/* Header */}
          {user && (
            <>
              <div className="max-w-container-lg mx-auto">
                {user.banner ? (
                  <Banner src={user?.banner} alt="Banner" />
                ) : (
                  <div className="h-tweetImage bg-gray-700 w-full"></div>
                )}
              </div>
              <div className="max-w-container-lg px-4 mx-auto">
                <UserInfos user={user!} />
              </div>
            </>
          )}

          {/* Tweets */}
          {tweetsLoading ? (
            <BasicLoader />
          ) : (
            <div className="w-full md:p-4 flex flex-col justify-center items-center overflow-y-auto md:overflow-y-visible">
              {/* Tweet Column */}
              <div className="container max-w-container flex flex-col md:flex-row mx-auto gap-6 p-4 md:p-0 overflow-y-auto">
                {/* Sidebar */}
                <div className="w-full md:w-sidebarWidth flex-none ">
                  <ul className="bg-white rounded-lg shadow py-4">
                    <li
                      className={`profile_link ${
                        filter === 'TWEETS_RETWEETS' ? 'active' : ''
                      }`}
                      onClick={() => setFilter('TWEETS_RETWEETS')}
                    >
                      Tweets
                    </li>
                    <li
                      className={`profile_link ${
                        filter === 'WITH_COMMENTS' ? 'active' : ''
                      }`}
                      onClick={() => setFilter('WITH_COMMENTS')}
                    >
                      Tweets & Answers
                    </li>
                    <li
                      className={`profile_link ${
                        filter === 'ONLY_MEDIA' ? 'active' : ''
                      }`}
                      onClick={() => setFilter('ONLY_MEDIA')}
                    >
                      Media
                    </li>
                    <li
                      className={`profile_link ${
                        filter === 'ONLY_LIKES' ? 'active' : ''
                      }`}
                      onClick={() => setFilter('ONLY_LIKES')}
                    >
                      Like
                    </li>
                  </ul>
                </div>

                <div className="w-full md:w-tweetContainer">
                  {/* Tweet Feed */}
                  {tweets && tweets.length === 0 && (
                    <h5 className="text-gray7 text-2xl text-center mt-2">
                      No tweets found ;)
                    </h5>
                  )}
                  {tweets && tweets.length > 0 && (
                    <ul>
                      {tweets.map((t: TweetType, index: number) => {
                        const key = `${t.id}_${index}`
                        if (t.parent !== null) {
                          return <Comments tweet={t} key={key} />
                        } else {
                          return <Tweet key={key} tweet={t} />
                        }
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </Layout>
  )
}

export default Profile
