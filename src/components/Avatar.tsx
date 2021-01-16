import React from 'react'
import { avatarInitials } from '../utils/utils'

type AvatarProps = {
  display_name: string
  avatar?: string | null
  className?: string
  width?: string
  height?: string
  textSize?: string
}

const Avatar = ({
  display_name,
  avatar,
  className,
  width = 'w-10',
  height = 'h-10',
  textSize,
}: AvatarProps) => {
  return avatar ? (
    <img
      src={avatar}
      className={`${width} ${height} rounded-lg ${className} object-cover`}
      alt="avatar"
    />
  ) : (
    <div
      className={`${width} ${height} rounded-lg bg-gray5 p-4 text-sm text-white flex justify-center items-center ${className}`}
    >
      <div className={textSize}>{avatarInitials(display_name)}</div>
    </div>
  )
}

export default Avatar
