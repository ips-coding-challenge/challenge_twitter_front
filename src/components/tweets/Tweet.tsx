import React from 'react'
import { TweetType } from '../../types/types'
import { format } from 'date-fns'
import { formattedDate, pluralize } from '../../utils/utils'
import Avatar from '../Avatar'

type TweetProps = {
  tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <div className="p-4 shadow bg-white rounded mb-6">
      {/* Header */}
      <div className="flex items-center">
        <Avatar className="mr-4" display_name={tweet.user.display_name} />

        <div>
          <h4 className="font-bold">{tweet.user.display_name}</h4>
          <p className="text-gray4 text-xs mt-1">
            {formattedDate(tweet.created_at)}
          </p>
        </div>
      </div>

      {/* Media? */}
      {tweet.media && <img src={tweet.media} alt="tweet media" />}
      {/* Body */}
      <p className="mt-6 text-gray5">{tweet.body}</p>

      {/* Metadata */}
      <div className="flex justify-end mt-6">
        <p className="text-gray4 text-xs ml-4">
          {pluralize(tweet.commentsCount, 'Comment')}
        </p>
        <p className="text-gray4 text-xs ml-4">
          {pluralize(tweet.retweetsCount, 'Retweet')}{' '}
        </p>
      </div>

      <hr className="my-2" />
    </div>
  )
}

export default Tweet
