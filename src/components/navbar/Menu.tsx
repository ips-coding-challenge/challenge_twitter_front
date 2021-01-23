import React from 'react'
import MenuLink from './MenuLink'

const Menu = () => {
  return (
    <div className="flex h-full items-center justify-center gap-20">
      <MenuLink to="/" text="Home" />
      <MenuLink to="/explore" text="Explore" />
      <MenuLink to="/bookmarks" text="Bookmarks" />
    </div>
  )
}

export default Menu
