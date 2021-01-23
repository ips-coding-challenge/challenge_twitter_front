import React from 'react'
import Layout from '../components/Layout'
import Feed from '../components/tweets/Feed'

const Home = () => {
  return (
    <Layout>
      {/* Tweet Column */}
      <div className="container max-w-container flex mx-auto gap-4 p-4 md:p-0 overflow-y-auto">
        <div className="w-full md:w-tweetContainer">
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
    </Layout>
  )
}

export default Home
