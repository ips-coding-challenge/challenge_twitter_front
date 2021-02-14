import { useMutation } from '@apollo/client'
import React, { ButtonHTMLAttributes, useState } from 'react'
import { MdCheck, MdPersonAdd } from 'react-icons/md'
import { useRecoilValue } from 'recoil'
import { TOGGLE_FOLLOW } from '../graphql/followers/mutations'
import { userState } from '../state/userState'
import { UserType } from '../types/types'
import Button, { ButtonProps } from './Button'

type FollowButtonProps = {
  user: UserType
  className?: string
}

const FollowButton = ({ user, className }: FollowButtonProps) => {
  const [followUser] = useMutation(TOGGLE_FOLLOW)
  const [following, setFollowing] = useState(false)

  const onClick = async () => {
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
    <Button
      onClick={onClick}
      text={following ? 'Followed' : 'Follow'}
      variant={following ? 'success' : 'primary'}
      disabled={following}
      className={className}
      icon={
        following ? (
          <MdCheck className="text-white" />
        ) : (
          <MdPersonAdd className="text-white" />
        )
      }
    />
  )
}

export default FollowButton
