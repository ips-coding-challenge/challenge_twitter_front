import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { MdCheck, MdPersonAdd } from 'react-icons/md'
import { TOGGLE_FOLLOW } from '../../../graphql/followers/mutations'
import { UserType } from '../../../types/types'
import { pluralize } from '../../../utils/utils'
import Avatar from '../../Avatar'
import Button from '../../Button'
import MyImage from '../../MyImage'

type SingleUserProps = {
  user: UserType
}

export const SingleUser = ({ user }: SingleUserProps) => {
  const [followUser] = useMutation(TOGGLE_FOLLOW)
  const [following, setFollowing] = useState(false)

  const onClick = async () => {
    // TODO: add a modal to tell the user that he already follows this user
    if (following) return false
    try {
      setFollowing(true)
      await followUser({
        variables: {
          following_id: user.id,
        },
      })
    } catch (e) {
      console.log('e', e)
      setFollowing(false)
    }
  }

  return (
    <div className="my-6 border-b last:border-b-0 pb-6 last:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          <Avatar className="mr-2" user={user} />
          <div>
            <p className="">{user.display_name}</p>
            <p className="text-xs text-gray7">
              {pluralize(user?.followersCount!, 'Follower')}
            </p>
          </div>
        </div>
        <Button
          onClick={onClick}
          text="Follow"
          variant={following ? 'success' : 'primary'}
          disabled={following}
          icon={
            following ? (
              <MdCheck className="text-white" />
            ) : (
              <MdPersonAdd className="text-white" />
            )
          }
        />
      </div>
      {/* Bio */}
      {user.bio && <p className="text-gray7">{user.bio}</p>}

      {/* Banner */}
      {user.banner && (
        <MyImage style={{ height: '100px' }} src={user?.banner!} alt="banner" />
      )}
    </div>
  )
}
