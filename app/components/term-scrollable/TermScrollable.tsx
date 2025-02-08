import React from 'react'

const TermScrollable = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='relative'>
      <div className='h-[80vh] max-w-[60rem] overflow-scroll py-[2rem] pr-[3rem] xl:pr-[8rem] search-scrollbar'>
        {children}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[6rem] bg-gradient-to-b from-transparent to-[#F0F0F0] pointer-events-none" />
    </div>
  )
}

export default TermScrollable;
