import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

type MenuLinkProps = {
  to: string
  text: string
} & NavLinkProps

const MenuLink = ({ text, to }: MenuLinkProps) => {
  return (
    <NavLink to={to} activeClassName="selected" className="menu">
      {text}
    </NavLink>
  )
}

export default MenuLink
