import React from 'react'
import { UserType } from '../../types/types'
import Avatar from '../Avatar'

type UserInfosProps = {
  user: UserType
}

const UserInfos = ({ user }: UserInfosProps) => {
  return (
    <div className="relative container max-w-container mx-auto bg-white rounded-lg shadow -mt-8">
      <Avatar user={user} height="w-20" width="w-20" className="z-20" />
    </div>
  )
}

export default UserInfos
