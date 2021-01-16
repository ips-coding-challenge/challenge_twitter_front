import React from 'react'
import { TweetType, UserType } from '../../types/types'
import { formattedDate, pluralize } from '../../utils/utils'
import Avatar from '../Avatar'
import Button from '../Button'
import {
  MdBookmarkBorder,
  MdFavoriteBorder,
  MdLoop,
  MdModeComment,
} from 'react-icons/md'
import { gql, useMutation } from '@apollo/client'
import { TOGGLE_LIKE } from '../../graphql/tweets/mutations'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/userState'

type TweetProps = {
  tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => {
  const user = useRecoilValue(userState)
  const [toggleLike, { error }] = useMutation(TOGGLE_LIKE, {
    variables: {
      tweet_id: tweet.id,
    },
    update(cache, { data: { toggleLike } }) {
      console.log('cache', cache)
      cache.modify({
        fields: {
          feed(tweets: TweetType[]) {
            // console.log('tweets', tweets)
            const newTweetRef = cache.writeFragment({
              data: toggleLike,
              fragment: gql`
                fragment NewTweet on Tweet {
                  id
                  isLiked
                }
              `,
            })

            // console.log('newTweetRef', newTweetRef)

            return [...tweets, newTweetRef]
          },
        },
      })
    },
  })

  const showRetweet = () => {
    if (tweet.user.id === user!.id) {
      return <div>You have retweeted</div>
    } else {
      return <div>{tweet.user.display_name} retweeted</div>
    }
  }

  return (
    <div className="p-4 shadow bg-white rounded mb-6">
      {/* Retweet */}
      {tweet.type === 'retweet' ? showRetweet() : ''}
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
      <div>
        <p className="mt-6 text-gray5">{tweet.body}</p>
      </div>

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
      {/* Buttons */}
      <div className="flex justify-around">
        <Button
          text="Comments"
          variant="default"
          className="text-sm"
          icon={<MdModeComment />}
          alignment="left"
        />
        <Button
          text="Retweets"
          variant="default"
          className="text-sm"
          icon={<MdLoop />}
          alignment="left"
        />
        <Button
          text={`${tweet.isLiked ? 'Liked' : 'Likes'}`}
          variant={`${tweet.isLiked ? 'active' : 'default'}`}
          className={`text-sm`}
          onClick={() => toggleLike()}
          icon={<MdFavoriteBorder />}
          alignment="left"
        />
        <Button
          text="Saved"
          variant="default"
          className="text-sm"
          icon={<MdBookmarkBorder />}
          alignment="left"
        />
      </div>
    </div>
  )
}

export default Tweet
