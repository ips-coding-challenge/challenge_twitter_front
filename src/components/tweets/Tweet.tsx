import React, { SyntheticEvent, useEffect, useState } from 'react'
import {
  MdBookmarkBorder,
  MdFavorite,
  MdLoop,
  MdModeComment,
} from 'react-icons/md'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/userState'
import { TweetType } from '../../types/types'
import { formattedDate, pluralize, stopPropagation } from '../../utils/utils'
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
import { Link } from 'react-router-dom'
import MyImage from '../MyImage'
import LikeOrRetweet from './LikeOrRetweet'

type TweetProps = {
  tweet: TweetType
  showStats?: boolean
}

const Tweet = ({ tweet, showStats = true }: TweetProps) => {
  const user = useRecoilValue(userState)

  const [showCommentForm, setShowCommentForm] = useState(false)
  // console.log('tweet', tweet)

  const renderParsedTweet = () => {
    let replacedText

    // Match URLs
    replacedText = reactStringReplace(
      nl2br(tweet.body),
      /(https?:\/\/\S+)/g,
      (match, i) => {
        if (
          tweet.preview &&
          match === tweet.preview.url &&
          tweet.media === null
        ) {
          return <Preview key={tweet.preview.id} preview={tweet.preview} />
        } else {
          return (
            <a
              className="text-primary hover:text-primary_hover"
              key={match + i}
              href={match}
              onClick={stopPropagation}
              target="_blank"
              rel="noopener, noreferrer"
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
        onClick={stopPropagation}
      >
        #{match}
      </a>
    ))
    return replacedText
  }

  const toggleCommentForm = (e: any) => {
    setShowCommentForm((old) => (old = !old))
  }

  const renderLikeOrRetweet = () => {
    if (!tweet) return null
    if (tweet.type === 'retweet' && !tweet.retweetAuthor) {
      return (
        <div className="flex text-sm text-gray7 items-center">
          <MdLoop className="mr-2" />
          <span>You retweeted</span>
        </div>
      )
    }

    if (tweet.likeAuthor || tweet.retweetAuthor) {
      return (
        <LikeOrRetweet
          icon={tweet.retweetAuthor ? <MdLoop /> : <MdFavorite />}
          username={
            tweet.retweetAuthor
              ? tweet.retweetAuthor.username
              : tweet.likeAuthor!.username
          }
          display_name={
            tweet.retweetAuthor
              ? tweet.retweetAuthor.display_name
              : tweet.likeAuthor!.display_name
          }
          text={tweet.retweetAuthor ? ' has retweeted' : ' has liked'}
        />
      )
    } else {
      return null
    }
  }

  return (
    <>
      {/* Retweet */}
      {renderLikeOrRetweet()}
      <div className="p-4 shadow bg-white rounded mb-6">
        <Link to={`/status/${tweet.id}`} className="block">
          {/* Header */}
          <div className="flex items-center">
            <Avatar className="mr-4" user={tweet.user} />

            <div>
              <Link
                to={`/users/${tweet.user.username}`}
                className="hover:text-primary"
              >
                <h4 className="font-bold">{tweet.user.display_name}</h4>
              </Link>
              <p className="text-gray4 text-xs mt-1">
                {formattedDate(tweet.created_at)}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="mt-6 text-gray5">{renderParsedTweet()}</div>

          {/* Media? */}
          {tweet.media && <MyImage src={tweet.media.url} />}

          {/* Metadata */}

          {showStats && <TweetStats id={tweet.id} />}
        </Link>
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
          <TweetForm
            type={TweetTypeEnum.COMMENT}
            tweet_id={tweet.id}
            onSuccess={() => setShowCommentForm(false)}
          />
        )}
      </div>
    </>
  )
}

export default Tweet
