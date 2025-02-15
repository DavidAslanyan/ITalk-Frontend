import React, { useState } from 'react';
import CheckIcon from '../icons/CheckIcon';
import { COLORS } from '@/app/utilities/constants/colors';

type CheckboxProps = {
  checked: boolean;
  setChecked: (prev: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  setChecked
}) => {
  const toggleCheckbox = () => setChecked(!checked);

  return (
    <div
      className={`z-0 relative w-6 h-5 flex items-center justify-center cursor-pointer rounded-[0.2rem] border-2 border-secondary transition-all ${checked ? 'bg-secondary' : 'bg-white'}`}
      onClick={toggleCheckbox}
      style={{ userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}
    >
      {checked && 
        <CheckIcon width={15} height={20} color={COLORS.primary} />
      }
    </div>
  );
};

export default Checkbox;
