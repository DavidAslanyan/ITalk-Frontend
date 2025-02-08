import React from 'react'
import LeftMenu from '../components/left-menu';
import Tabbar from '../components/tabbar/Tabbar';
import UserTabs from '../components/user-tabs';

const Layout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="relative flex bg-backPrimary">
      <div className='z-50 fixed top-2 right-5'>
        <UserTabs />
      </div>
      <aside className="hidden md:block fixed top-0 mt-2 ml-2">
        <LeftMenu />
      </aside>
      <aside className='z-50 md:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2'>
        <Tabbar />
      </aside>
      <div className='px-5 md:px-0 md:ml-[6rem] xl:ml-[12rem] pt-2 flex-1 w-full h-auto min-h-[100vh]'>
        {children}
      </div>
    </main>
  )
}

export default Layout;

