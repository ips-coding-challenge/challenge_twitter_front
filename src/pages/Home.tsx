import React from 'react'
import Layout from '../components/Layout'
import Hashtags from '../components/sidebars/Hashtags'
import Feed from '../components/tweets/Feed'

const Home = () => {
  return (
    <Layout>
      <div className="w-full bg-gray1 md:p-4 flex flex-col justify-center items-center overflow-y-auto md:overflow-y-visible">
        {/* Tweet Column */}
        <div className="container max-w-container flex mx-auto gap-4 p-4 md:p-0 overflow-y-auto">
          <div className="w-full md:w-tweetContainer">
            {/* Tweet Form */}

            {/* Tweet Feed */}
            <Feed />
          </div>

          {/* Hashtags */}
          <div className="hidden md:block w-sidebarWidth flex-none">
            <Hashtags />
          </div>

          {/* Followers Suggestions */}
        </div>
      </div>
    </Layout>
  )
}

export default Home
