import React, { ReactNode } from 'react'

type DashboardContainerProps = {
  children: ReactNode
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children
}) => {
  return (
    <div className='w-full max-w-[30rem] border-2 border-gray-300 h-[15rem] sm:h-[12rem] rounded-md shadow-sm'>
      {children}
    </div>
  )
}

export default DashboardContainer;
