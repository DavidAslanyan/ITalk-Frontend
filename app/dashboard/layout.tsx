import React from 'react'
import LeftMenu from '../components/leftMenu';

const Layout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex bg-backPrimary">
      <aside className="fixed top-0 mt-2 ml-2">
        <LeftMenu />
      </aside>
      <div className='ml-[12rem] pt-2 flex-1 w-full h-auto min-h-[100vh]'>
        {children}
      </div>
    </main>
  )
}

export default Layout;

