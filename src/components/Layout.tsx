import React from 'react'
import MenuMobile from './navbar/MenuMobile'
import Navbar from './navbar/Navbar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden md:h-full md:overflow-auto">
      <Navbar />
      <div className="w-full bg-gray1 md:p-4 flex flex-col justify-center items-center overflow-y-auto md:overflow-y-visible">
        {children}
      </div>

      {/* Menu For Mobile */}
      <MenuMobile />
    </div>
  )
}

export default Layout
