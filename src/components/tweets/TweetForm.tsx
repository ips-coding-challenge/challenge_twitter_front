import { gql, useMutation } from '@apollo/client'
import { forwardRef, useEffect, useState } from 'react'
import { MdImage, MdPublic } from 'react-icons/md'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ADD_TWEET } from '../../graphql/tweets/mutations'
import { tweetsState } from '../../state/tweetsState'
import { userState } from '../../state/userState'
import { extractMetadata, shortenURLS } from '../../utils/utils'
import { addTweetSchema } from '../../validations/tweets/schema'
import Avatar from '../Avatar'
import Button from '../Button'

const TweetForm = forwardRef((props, ref) => {
  const user = useRecoilValue(userState)
  const setTweets = useSetRecoilState(tweetsState)
  const [body, setBody] = useState('')
  const [addTweetMutation, { loading, error, data }] = useMutation(ADD_TWEET)

  const addTweet = async () => {
    // Parse the tweet
    const { hashtags, urls } = await extractMetadata(body)

    // Shorten the urls
    let shortenedURLS: any
    let newBody = null
    if (urls && urls.length > 0) {
      shortenedURLS = await shortenURLS(urls)
      shortenedURLS.forEach((el: any) => {
        // Need to escape characters from the url to replace
        const pattern = el.original.replace(/[^a-zA-Z0-9]/g, '\\$&')
        newBody = body.replace(new RegExp(pattern), el.shorten)
      })
    }

    try {
      await addTweetSchema.validate({ body, hashtags, shortenedURLS })
      await addTweetMutation({
        variables: {
          payload: {
            body: newBody ?? body,
            hashtags,
            url: shortenedURLS[0].shorten,
          },
        },
      })
    } catch (e) {
      console.log('e', e)
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
      <h3>Tweet something</h3>
      <hr className="my-2" />
      <div className="flex w-full">
        <Avatar className="mr-2" display_name={user!.display_name} />
        <div className="w-full">
          <textarea
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full placeholder-gray4 p-2 mb-2"
            placeholder="What's happening"
          ></textarea>
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
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default TweetForm
