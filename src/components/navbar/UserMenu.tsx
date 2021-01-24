import React, { useRef, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { useRecoilValue } from 'recoil'
import { useClickOutside } from '../../hooks/useClickOutside'
import { userState } from '../../state/userState'
import Avatar from '../Avatar'
import UserDropdown from './UserDropdown'

const UserMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const user = useRecoilValue(userState)
  const menuRef = useRef(null)
  const dropdownRef = useRef(null)
  useClickOutside(dropdownRef, menuRef, () => {
    setShowDropdown(false)
  })
  return (
    <div
      ref={menuRef}
      className="flex items-center justify-center relative"
      onClick={() => setShowDropdown((old) => !old)}
    >
      <Avatar display_name={user?.display_name!} className="mr-3" />
      <div className="hidden cursor-pointer md:flex items-center">
        <div className="mr-4">{user?.display_name}</div>
        <MdArrowDropDown className="text-xl" />
      </div>
      <UserDropdown ref={dropdownRef} show={showDropdown} />
    </div>
  )
}

export default UserMenu
