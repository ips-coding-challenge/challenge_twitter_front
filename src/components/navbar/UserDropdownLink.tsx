import React from 'react'
import { MdPeople } from 'react-icons/md'
import { Link, LinkProps } from 'react-router-dom'

type UserDropdownLinkProps = {
  icon: JSX.Element
  text: string
  to: string
  className?: string
} & LinkProps

const UserDropdownLink = ({
  icon,
  text,
  to,
  className,
  ...rest
}: UserDropdownLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-2 py-2 my-2 ${className} hover:bg-gray2 transition-colors duration-300 rounded-lg`}
      {...rest}
    >
      <div className="text-xl">{icon}</div>
      <span className="ml-3">{text}</span>
    </Link>
  )
}

export default UserDropdownLink
