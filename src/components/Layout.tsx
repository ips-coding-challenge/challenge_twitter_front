import React from 'react'
import Navbar from './Navbar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="w-full bg-gray1 p-4 flex flex-col justify-center items-center">
        {children}
      </div>
    </>
  )
}

export default Layout
