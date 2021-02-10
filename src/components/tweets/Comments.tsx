import React from 'react'
import { TweetType } from '../../types/types'
import Tweet from './Tweet'

type CommentsProps = {
  tweet: TweetType
}

const Comments = ({ tweet }: CommentsProps) => {
  return (
    <div className="border border-primary p-2 mb-6 rounded-lg shadow">
      <Tweet tweet={tweet.parent!} showStats={false} />
      <div className="pl-4 -mt-4 -mb-4">
        <Tweet tweet={tweet} />
      </div>
    </div>
  )
}

export default Comments
