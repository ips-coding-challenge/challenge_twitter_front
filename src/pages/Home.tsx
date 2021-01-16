import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Feed from '../components/tweets/Feed'
import Tweet from '../components/tweets/Tweet'
import { FEED } from '../graphql/tweets/queries'
import { TweetType } from '../types/types'

const Home = () => {
  return (
    <Layout>
      {/* Tweet Column */}
      <div className="container max-w-container flex mx-auto gap-4">
        <div className="w-tweetContainer">
          {/* Tweet Form */}

          {/* Tweet Feed */}
          <Feed />
        </div>

        {/* Home Sidebar */}
        <div className="hidden md:block w-sidebarWidth bg-gray5 flex-none">
          Sidebar
        </div>

        {/* Hashtags */}

        {/* Followers Suggestions */}
      </div>

      {/* {data && data.feed.length > 0 && (
        <div className="w-full max-w-tweetContainer mx-auto">
          <ul>
            {data.feed.map((t: TweetType) => (
              <Tweet key={t.id} tweet={t} />
            ))}
          </ul>
        </div>
      )} */}
    </Layout>
  )
}

export default Home
