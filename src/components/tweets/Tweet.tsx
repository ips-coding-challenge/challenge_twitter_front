import React from 'react'
import { MdBookmarkBorder, MdLoop, MdModeComment } from 'react-icons/md'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/userState'
import { TweetType } from '../../types/types'
import { formattedDate, pluralize } from '../../utils/utils'
import Avatar from '../Avatar'
import Button from '../Button'
import IsLikedButton from './actions/IsLikedButton'
import nl2br from 'react-nl2br'
import reactStringReplace from 'react-string-replace'
import Preview from './Preview'
type TweetProps = {
  tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => {
  const user = useRecoilValue(userState)

  const showRetweet = () => {
    if (tweet.user.id === user!.id) {
      return <div>You have retweeted</div>
    } else {
      return <div>{tweet.user.display_name} retweeted</div>
    }
  }

  const renderParsedTweet = () => {
    let replacedText

    // Match URLs
    replacedText = reactStringReplace(
      nl2br(tweet.body),
      /(https?:\/\/\S+)/g,
      (match, i) => {
        if (tweet.preview && match === tweet.preview.url) {
          return <Preview key={tweet.preview.id} preview={tweet.preview} />
        } else {
          return (
            <a
              className="text-primary hover:text-primary_hover"
              key={match + i}
              href={match}
            >
              {match}
            </a>
          )
        }
      }
    )
    // Match hashtags
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
      <a
        className="font-bold hover:text-gray-500 transition-colors duration-300"
        key={match + i}
        href={`/hashtag/${match}`}
      >
        #{match}
      </a>
    ))
    return replacedText
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
      <div className="mt-6 text-gray5">{renderParsedTweet()}</div>

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
          className="text-lg md:text-sm"
          icon={<MdModeComment />}
          alignment="left"
          hideTextOnMobile={true}
        />
        <Button
          text="Retweets"
          variant="default"
          className="text-lg md:text-sm"
          icon={<MdLoop />}
          alignment="left"
          hideTextOnMobile={true}
        />

        <IsLikedButton id={tweet.id} />

        <Button
          text="Saved"
          variant="default"
          className="text-lg md:text-sm"
          icon={<MdBookmarkBorder />}
          alignment="left"
          hideTextOnMobile={true}
        />
      </div>
    </div>
  )
}

export default Tweet
