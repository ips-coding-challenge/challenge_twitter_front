import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../../state/userState'
import { UserType } from '../../types/types'
import { pluralize } from '../../utils/utils'
import Avatar from '../Avatar'
import FollowButton from '../FollowButton'

type UserInfosProps = {
  user: UserType
}

const UserInfos = ({ user }: UserInfosProps) => {
  const connectedUser = useRecoilValue(userState)
  return (
    <div className="relative container max-w-container mx-auto flex flex-col items-center p-6 bg-white rounded-lg shadow -mt-8">
      <div className="relative">
        <Avatar
          user={user}
          height="w-28"
          width="w-28"
          className="ring-4 ring-white -mt-20"
        />
      </div>
      {/* Name */}
      <h3 className="font-semibold text-xl text-center mt-6">
        {user.display_name}
      </h3>

      {/* Followers */}
      <div className="flex items-center justify-center mt-6">
        <div className="mr-4">
          <span className="mr-2 font-semibold">{user.followingsCount}</span>
          <span className="text-gray7">
            {pluralize(user.followingsCount!, 'Following', true)}
          </span>
        </div>
        <div className="">
          <span className="mr-2 font-semibold">{user.followersCount}</span>
          <span className="text-gray7">
            {pluralize(user.followersCount!, 'Follower', true)}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="font-noto text-xl text-gray7 text-center mt-6">
        {user.bio}
      </p>

      {/* FollowButton */}

      {connectedUser!.id !== user.id && (
        <FollowButton user={user} className="mt-6" />
      )}
    </div>
  )
}

export default UserInfos
