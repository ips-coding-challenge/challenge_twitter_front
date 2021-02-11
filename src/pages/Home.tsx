import React from 'react'
import Layout from '../components/Layout'
import Hashtags from '../components/sidebars/Hashtags'
import UsersToFollow from '../components/sidebars/followers/UsersToFollow'
import Feed from '../components/tweets/Feed'

const Home = () => {
  return (
    <Layout>
      <div className="w-full bg-gray1 md:p-4 flex flex-col justify-center items-center overflow-y-auto md:overflow-y-visible">
        {/* Tweet Column */}
        <div className="container max-w-container flex mx-auto gap-4 p-4 md:p-0 overflow-y-auto">
          <div className="w-full md:w-tweetContainer">
            {/* Tweet Feed */}
            <Feed />
          </div>

          <div className="hidden md:block w-sidebarWidth flex-none">
            {/* Hashtags */}
            <Hashtags />
            {/* Followers Suggestions */}
            <UsersToFollow />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
