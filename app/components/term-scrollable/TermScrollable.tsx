import React, { ReactNode } from 'react'

type TermScrollablePorps = {
  height?: string;
  children: ReactNode;
}

const TermScrollable: React.FC<TermScrollablePorps> = ({ height = "h-[80vh]", children }) => {
  return (
    <div className='relative'>
      <div className={`${height} max-w-[60rem] overflow-scroll py-[2rem] pr-[3rem] xl:pr-[8rem] search-scrollbar`}>
        {children}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[6rem] bg-gradient-to-b from-transparent to-[#F0F0F0] pointer-events-none" />
    </div>
  )
}

export default TermScrollable;
