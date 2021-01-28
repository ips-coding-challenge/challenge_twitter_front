import React, { useState } from 'react'
import { MdBookmarkBorder, MdLoop, MdModeComment } from 'react-icons/md'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/userState'
import { TweetType } from '../../types/types'
import { formattedDate, pluralize } from '../../utils/utils'
import Avatar from '../Avatar'
import Button from '../Button'
import LikeButton from './actions/LikeButton'
import nl2br from 'react-nl2br'
import reactStringReplace from 'react-string-replace'
import Preview from './Preview'
import RetweetButton from './actions/RetweetButton'
import TweetStats from './TweetStats'
import BookmarkButton from './actions/BookmarkButton'
import TweetForm, { TweetTypeEnum } from './TweetForm'

type TweetProps = {
  tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => {
  const user = useRecoilValue(userState)

  const [showCommentForm, setShowCommentForm] = useState(false)

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

  const toggleCommentForm = (e: any) => {
    setShowCommentForm((old) => (old = !old))
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
      <TweetStats id={tweet.id} />

      <hr className="my-2" />
      {/* Buttons */}
      <div className="flex justify-around">
        <Button
          text="Comment"
          variant="default"
          className="text-lg md:text-sm"
          icon={<MdModeComment />}
          alignment="left"
          hideTextOnMobile={true}
          onClick={toggleCommentForm}
        />

        <RetweetButton id={tweet.id} />
        <LikeButton id={tweet.id} />
        <BookmarkButton id={tweet.id} />
      </div>

      {showCommentForm && (
        <TweetForm type={TweetTypeEnum.COMMENT} tweet_id={tweet.id} />
      )}
    </div>
  )
}

export default Tweet
