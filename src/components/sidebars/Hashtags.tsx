import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { HASHTAGS } from '../../graphql/hashtags/queries'
import { HashtagType } from '../../types/types'
import { pluralize } from '../../utils/utils'
import BasicLoader from '../loaders/BasicLoader'

const Hashtags = () => {
  const { data, loading, error } = useQuery(HASHTAGS)

  if (loading) return <BasicLoader />
  if (error) return <div>Error loading the hashtags</div>
  return (
    <div className="rounded-lg shadow bg-white p-4">
      <h3 className="mb-1 font-semibold text-gray5">Trends</h3>
      <hr />
      {data && data.trendingHashtags ? (
        <ul className="mt-4">
          {data.trendingHashtags.map((h: HashtagType) => {
            return (
              <li key={h.id} className="mb-4 text-noto">
                <Link
                  to={`/hashtags/${h.hashtag.replace('#', '')}`}
                  className="font-semibold text-gray8 mb-3 hover:text-gray-500 transition-colors duration-300"
                >
                  {h.hashtag}
                </Link>
                <p className="text-gray7 text-xs">
                  {pluralize(h.tweetsCount!, 'Tweet')}
                </p>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default Hashtags
