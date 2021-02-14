import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../state/userState'
import MenuMobile from './navbar/MenuMobile'
import Navbar from './navbar/Navbar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const user = useRecoilValue(userState)

  return (
    <div className="flex flex-col h-screen overflow-hidden md:h-full md:overflow-auto">
      <Navbar />
      <div className="w-full h-auto overflow-y-auto md:overflow-y-visible bg-gray1">
        {children}
      </div>

      {/* Menu For Mobile */}
      {user && <MenuMobile />}
    </div>
  )
}

export default Layout
