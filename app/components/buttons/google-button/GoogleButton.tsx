import React from 'react'
import GoogleIcon from '../../icons/GoogleIcon';

type GoogleButtonProps = {
  title: string;
  onClick: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({
  title,
  onClick
}) => {
  return (
    <button onClick={onClick} className='border-thirdly border-2 w-full py-2 rounded-[0.4rem] flex items-center justify-center gap-3'>
      <GoogleIcon width={20} height={20} />
      {title}
    </button>
  )
}

export default GoogleButton