import { gql, useMutation } from '@apollo/client'
import { forwardRef, useEffect, useState } from 'react'
import { MdImage, MdPublic } from 'react-icons/md'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ADD_TWEET } from '../../graphql/tweets/mutations'
import { tweetsState } from '../../state/tweetsState'
import { userState } from '../../state/userState'
import { parseTweet } from '../../utils/utils'
import { addTweetSchema } from '../../validations/tweets/schema'
import Avatar from '../Avatar'
import Button from '../Button'

const TweetForm = forwardRef((props, ref) => {
  const user = useRecoilValue(userState)
  const setTweets = useSetRecoilState(tweetsState)
  const [body, setBody] = useState('')
  const [addTweetMutation, { loading, error, data }] = useMutation(ADD_TWEET)

  const addTweet = async () => {
    const { hashtags, url } = parseTweet(body)

    console.log('hashtags, url', hashtags, url)
    try {
      await addTweetSchema.validate({ body, hashtags, url })
      await addTweetMutation({
        variables: {
          payload: {
            body,
            hashtags,
            url,
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
