import React, { ReactNode } from 'react'

type AvatarBorderProps = {
  borderType?: string;
  children: ReactNode;
}

const AvatarBorder: React.FC<AvatarBorderProps> = ({
  borderType = "def",
  children
}) => {
  return (
    <div className="w-[12rem] border-[1rem] border-thirdly rounded-full">
      {children}
    </div>
  )
}

export default AvatarBorder