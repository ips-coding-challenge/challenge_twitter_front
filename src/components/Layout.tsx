import React from 'react'
import Navbar from './Navbar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="w-full p-4 md:w-authContainer md:mx-auto h-withoutNavbar flex flex-col justify-center items-center">
        {children}
      </div>
    </>
  )
}

export default Layout
