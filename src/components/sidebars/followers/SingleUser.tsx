import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { MdCheck, MdPersonAdd } from 'react-icons/md'
import { TOGGLE_FOLLOW } from '../../../graphql/followers/mutations'
import { UserType } from '../../../types/types'
import { pluralize } from '../../../utils/utils'
import Avatar from '../../Avatar'
import Button from '../../Button'
import FollowButton from '../../FollowButton'
import MyImage from '../../MyImage'

type SingleUserProps = {
  user: UserType
}

export const SingleUser = ({ user }: SingleUserProps) => {
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
        <FollowButton user={user} />
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
