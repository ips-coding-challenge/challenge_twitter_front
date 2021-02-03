import { ApolloError, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { MdImage, MdPublic } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ValidationError } from 'yup'

import { ADD_TWEET } from '../../graphql/tweets/mutations'
import {
  uploadMediaFinishedState,
  uploadMediaProgressState,
  uploadMediaState,
  uploadMediaUrlState,
} from '../../state/mediaState'
import { tweetsState } from '../../state/tweetsState'
import { userState } from '../../state/userState'
import {
  extractMetadata,
  handleErrors,
  shortenURLS,
  validateFiles,
} from '../../utils/utils'
import { addTweetSchema } from '../../validations/tweets/schema'
import Alert from '../Alert'
import Avatar from '../Avatar'
import Button from '../Button'
import Errors from '../errors/Errors'
import UploadMedia from '../media/UploadMedia'

type TweetFormProps = {
  tweet_id?: number
  type?: TweetTypeEnum
  onSuccess?: Function
}

export enum TweetTypeEnum {
  TWEET = 'tweet',
  COMMENT = 'comment',
}

const TweetForm = ({ tweet_id, type, onSuccess }: TweetFormProps) => {
  // Global state
  const user = useRecoilValue(userState)
  const setTweets = useSetRecoilState(tweetsState)
  const [uploadMedia, setUploadMedia] = useRecoilState(uploadMediaState)
  const [uploadMediaUrl, setUploadMediaURL] = useRecoilState(
    uploadMediaUrlState
  )
  const [uploadMediaFinished, setUploadMediaFinished] = useRecoilState(
    uploadMediaFinishedState
  )
  const setUploadMediaProgress = useSetRecoilState(uploadMediaProgressState)

  // Local state
  const [body, setBody] = useState('')
  const [addTweetMutation, { data }] = useMutation(ADD_TWEET)
  // I create a local state for loading instead of using the apollo loading
  // It's because of the urlShortener function.
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationError | null>(null)
  const [serverErrors, setServerErrors] = useState<any[]>([])
  const [mediaError, setMediaError] = useState<string | null>(null)

  const addTweet = async () => {
    setErrors(null)
    setServerErrors([])
    setLoading(true)
    // extract info from the tweet body ( urls, hashtags for now)
    const { hashtags, urls } = await extractMetadata(body)

    // Shorten the urls
    let shortenedURLS: any
    let newBody = body.slice() /* make a copy of the body */
    if (urls && urls.length > 0) {
      // Shorten the url via tinyURL
      // Not ideal but ok for now as I didn't create my own service to shorten the url
      // and I don't think I will create one ;)
      shortenedURLS = await shortenURLS(urls)
      shortenedURLS.forEach((el: any) => {
        // Need to escape characters for the regex to work
        const pattern = el.original.replace(/[^a-zA-Z0-9]/g, '\\$&')
        newBody = newBody.replace(new RegExp(pattern), el.shorten)
      })
    }

    try {
      // Honestly, I should not validate against hashtags and shortenedURLS as
      // it's an "intern" thing. I let it for now mostly for development purposes.
      await addTweetSchema.validate({
        body,
        hashtags,
        shortenedURLS,
      })

      const payload: any = {
        body: newBody ?? body,
        hashtags,
        url: shortenedURLS ? shortenedURLS[0].shorten : null,
        ...(type && { type }),
        ...(tweet_id && { parent_id: tweet_id }),
        ...(uploadMediaUrl && { media: uploadMediaUrl }),
      }

      await addTweetMutation({
        variables: {
          payload,
        },
      })
      if (onSuccess) {
        onSuccess()
      }
    } catch (e) {
      if (e instanceof ValidationError) {
        setErrors(e)
      } else if (e instanceof ApolloError) {
        setServerErrors(handleErrors(e))
      }

      console.log('e', e)
    } finally {
      setLoading(false)

      //Reset all medias state
      //Maybe do that only if the request is successfull
      setUploadMediaURL(null)
      setUploadMedia(null)
      setUploadMediaFinished(false)
      setUploadMediaProgress(0)
    }
  }

  const onMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setMediaError(null)
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      try {
        console.log('file', file)
        validateFiles(file, 5)
        setUploadMedia(file)
      } catch (e) {
        setMediaError(e.message)
        console.log('error with media file', e.message)
      }
    }
  }

  useEffect(() => {
    if (data) {
      setTweets((old) => {
        return [data.addTweet].concat(old)
      })
      setBody('')
    }
  }, [data])

  const commentHeader = () => {
    return (
      <>
        <span>In response to </span>
        <Link to="/" className="text-primary hover:text-primary_hover">
          @{user!.username}
        </Link>
      </>
    )
  }

  return (
    <div
      className={`mb-4 p-4 w-full rounded-lg shadow bg-white ${
        type === TweetTypeEnum.COMMENT ? 'mt-4 border border-primary' : ''
      }`}
    >
      {/* Errors from the server */}
      <Errors errors={serverErrors} />

      <h3 className={type === TweetTypeEnum.COMMENT ? 'text-sm' : ''}>
        {type === TweetTypeEnum.COMMENT ? commentHeader() : 'Tweet something'}
      </h3>
      <hr className="my-2" />
      <div className="flex w-full">
        <Avatar className="mr-2" display_name={user!.display_name} />
        <div className="w-full">
          <div className="w-full mb-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full placeholder-gray4 p-2 "
              placeholder="What's happening"
            ></textarea>
            {errors && errors.path === 'body' && (
              <span className="text-red-500 text-sm break-all">
                {errors.message}
              </span>
            )}
          </div>

          <UploadMedia />
          {mediaError?.length && (
            <span className="text-red-500 text-sm break-all">{mediaError}</span>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <div className="flex items-center">
              <label className="btn btn-primary" htmlFor="file">
                <MdImage
                  className={`text-xl text-primary mr-1 ${
                    uploadMedia
                      ? 'cursor-default text-gray5'
                      : 'cursor-pointer hover:text-primary_hover'
                  }`}
                />
                <input
                  className="hidden"
                  type="file"
                  id="file"
                  onChange={onMediaChange}
                />
              </label>
              <div className="text-primary inline-flex items-center">
                <MdPublic className="mr-1 text-xl" />
                <span className="text-xs">Everyone can reply</span>
              </div>
            </div>
            <Button
              text={type === TweetTypeEnum.COMMENT ? 'Comment' : 'Tweet'}
              variant="primary"
              className="disabled:opacity-30"
              onClick={addTweet}
              disabled={
                loading || (uploadMedia !== null && !uploadMediaFinished)
              }
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetForm
