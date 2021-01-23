import React from 'react'
import { MdBookmarkBorder, MdExplore, MdHome } from 'react-icons/md'

const MenuMobile = () => {
  return (
    <div className="md:hidden w-full h-16 bg-white z-10 flex flex-none items-center justify-between">
      <MdHome />
      <MdExplore />
      <MdBookmarkBorder />
    </div>
  )
}

export default MenuMobile
