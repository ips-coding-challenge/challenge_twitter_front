import { UserType } from '../types/types'
import { avatarInitials } from '../utils/utils'

type AvatarProps = {
  user: UserType
  className?: string
  width?: string
  height?: string
  textSize?: string
}

const Avatar = ({
  user,
  className,
  width = 'w-10',
  height = 'h-10',
  textSize,
}: AvatarProps) => {
  return user.avatar ? (
    <img
      src={user.avatar}
      className={`${width} ${height} rounded-lg ${className} object-cover`}
      alt="avatar"
    />
  ) : (
    <div
      className={`${width} ${height} rounded-lg bg-gray5 p-4 text-sm text-white flex justify-center items-center ${className}`}
    >
      <div className={textSize}>{avatarInitials(user.display_name)}</div>
    </div>
  )
}

export default Avatar
