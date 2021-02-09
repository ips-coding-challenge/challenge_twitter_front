import React from 'react'

type LikeOrRetweetProps = {
  icon: JSX.Element
  username: string
  display_name: string
  text: string
}

const LikeOrRetweet = ({
  icon,
  username,
  display_name,
  text,
}: LikeOrRetweetProps) => {
  return (
    <div className="flex items-center text-gray7 text-sm mb-1">
      <div className="mr-2">{icon}</div>
      <span>
        <a className="font-bold hover:text-black" href={`/users/${username}`}>
          {display_name}
        </a>
        {text}
      </span>
    </div>
  )
}

export default LikeOrRetweet
