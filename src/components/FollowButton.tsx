import { useMutation } from '@apollo/client'
import React, { ButtonHTMLAttributes, useEffect, useState } from 'react'
import { MdCheck, MdPersonAdd } from 'react-icons/md'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { TOGGLE_FOLLOW } from '../graphql/followers/mutations'
import { followersCountState } from '../state/profileState'
import { followingsState, userState } from '../state/userState'
import { UserType } from '../types/types'
import Button, { ButtonProps } from './Button'

type FollowButtonProps = {
  user: UserType
  className?: string
}

const FollowButton = ({ user, className }: FollowButtonProps) => {
  const [followingsUsers, setFollowingsUsers] = useRecoilState(followingsState)
  const updateFollowersCount = useSetRecoilState(followersCountState(user.id))

  const [followUser, { loading }] = useMutation(TOGGLE_FOLLOW)
  const [following, setFollowing] = useState(followingsUsers?.includes(user.id))

  const onClick = async () => {
    try {
      updateFollowersCount((old: any) => {
        if (!following) {
          return old + 1
        }
        return old - 1 < 0 ? 0 : old - 1
      })
      setFollowing((old) => (old = !old))

      const res = await followUser({
        variables: {
          following_id: user.id,
        },
      })
      setFollowingsUsers((old: any) => {
        if (res.data.toggleFollow.includes('followed')) {
          return old.concat(user.id)
        } else {
          const index = followingsUsers?.findIndex((id) => id === user.id)

          if (index && index > -1) {
            const copy = [...old]
            copy.splice(index, 1)

            return copy
          }

          return old
        }
      })
    } catch (e) {
      console.log('e', e)
      setFollowing((old) => (old = !old))
    }
  }
  return (
    <Button
      onClick={onClick}
      text={following ? 'Followed' : 'Follow'}
      variant={following ? 'success' : 'primary'}
      className={className}
      disabled={loading}
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
