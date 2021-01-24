import React, { forwardRef, useRef } from 'react'
import {
  MdAccountCircle,
  MdExitToApp,
  MdPeople,
  MdSettings,
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useClickOutside } from '../../hooks/useClickOutside'
import UserDropdownLink from './UserDropdownLink'

type UserDropdownProps = {
  show: boolean
}

const UserDropdown = forwardRef(({ show }: UserDropdownProps, ref: any) => {
  return show ? (
    <div
      ref={ref}
      className="absolute top-0 right-0 mt-16 w-menuDropdown bg-white px-4 py-2 rounded-lg border border-gray6"
    >
      <div className="flex flex-col">
        <UserDropdownLink icon={<MdAccountCircle />} text="Profile" to="/" />
        <UserDropdownLink icon={<MdSettings />} text="Settings" to="/" />
      </div>
      <hr />
      <div>
        <UserDropdownLink
          icon={<MdExitToApp />}
          text="Logout"
          to="/"
          className="text-red-500"
        />
      </div>
    </div>
  ) : null
})

export default UserDropdown
