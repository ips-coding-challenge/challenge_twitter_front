import { useQuery } from '@apollo/client'
import { USERSTOFOLLOW } from '../../../graphql/followers/queries'
import { UserType } from '../../../types/types'
import BasicLoader from '../../loaders/BasicLoader'
import { SingleUser } from './SingleUser'

const UsersToFollow = () => {
  const { data, loading, error } = useQuery(USERSTOFOLLOW)

  if (loading) return <BasicLoader />
  if (error) return <div>An error occured</div>
  return (
    <div className="rounded-lg shadow bg-white p-4 mt-4">
      <h3 className="mb-1 font-semibold text-gray5">Who to follow</h3>
      <hr />
      {data?.followersSuggestions.length && (
        <ul>
          {data?.followersSuggestions.map((user: UserType) => {
            return <SingleUser user={user} />
          })}
        </ul>
      )}
    </div>
  )
}

export default UsersToFollow
