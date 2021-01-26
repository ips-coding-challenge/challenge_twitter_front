import { ApolloError, useMutation } from '@apollo/client'
import { forwardRef, useEffect, useState } from 'react'
import { MdImage, MdPublic } from 'react-icons/md'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ValidationError } from 'yup'
import { ADD_TWEET } from '../../graphql/tweets/mutations'
import { tweetsState } from '../../state/tweetsState'
import { userState } from '../../state/userState'
import { extractMetadata, handleErrors, shortenURLS } from '../../utils/utils'
import { addTweetSchema } from '../../validations/tweets/schema'
import Alert from '../Alert'
import Avatar from '../Avatar'
import Button from '../Button'

const TweetForm = () => {
  // Global state
  const user = useRecoilValue(userState)
  const setTweets = useSetRecoilState(tweetsState)

  // Local state
  const [body, setBody] = useState('')
  const [addTweetMutation, { data }] = useMutation(ADD_TWEET)
  // I create a local state for loading instead of using the apollo loading
  // It's because of the urlShortener function.
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationError | null>(null)
  const [serverErrors, setServerErrors] = useState<any[]>([])

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
      await addTweetMutation({
        variables: {
          payload: {
            body: newBody ?? body,
            hashtags,
            url: shortenedURLS ? shortenedURLS[0].shorten : null,
          },
        },
      })
    } catch (e) {
      if (e instanceof ValidationError) {
        setErrors(e)
      } else if (e instanceof ApolloError) {
        setServerErrors(handleErrors(e))
      }

      console.log('e', e)
    } finally {
      setLoading(false)
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

  return (
    <div className="mb-4 p-4 w-full rounded-lg shadow bg-white">
      {serverErrors.length > 0 && (
        <div className="mb-4">
          {serverErrors.map((e: any, index: number) => {
            return (
              <Alert
                key={index}
                variant="danger"
                message={Array.isArray(e) ? e[0].message : e.message}
              />
            )
          })}
        </div>
      )}

      <h3>Tweet something</h3>
      <hr className="my-2" />
      <div className="flex w-full">
        <Avatar className="mr-2" display_name={user!.display_name} />
        <div className="w-full">
          <div className="w-full mb-2">
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full placeholder-gray4 p-2 "
              placeholder="What's happening"
            ></textarea>
            {errors && errors.path === 'body' && (
              <span className="text-red-500 text-sm">{errors.message}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <div className="flex items-center">
              <MdImage className="text-primary mr-2" />
              <div className="text-primary inline-flex items-center">
                <MdPublic className="mr-1" />
                <span className="text-xs">Everyone can reply</span>
              </div>
            </div>
            <Button
              text="Tweet"
              variant="primary"
              onClick={addTweet}
              disabled={loading}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetForm
