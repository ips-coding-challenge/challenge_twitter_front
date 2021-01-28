import { useRecoilValue } from 'recoil'
import { singleTweetState } from '../../state/tweetsState'
import { pluralize } from '../../utils/utils'

const TweetStats = ({ id }: { id: number }) => {
  const tweet = useRecoilValue(singleTweetState(id))

  return (
    <div className="flex justify-end mt-6">
      <p className="text-gray4 text-xs ml-4">
        {pluralize(tweet!.commentsCount, 'Comment')}
      </p>
      <p className="text-gray4 text-xs ml-4">
        {pluralize(tweet!.retweetsCount, 'Retweet')}
      </p>
      <p className="text-gray4 text-xs ml-4">
        {pluralize(tweet!.likesCount, 'Like')}
      </p>
      <p className="text-gray4 text-xs ml-4">
        {pluralize(tweet!.bookmarksCount, 'Bookmark')}
      </p>
    </div>
  )
}

export default TweetStats
