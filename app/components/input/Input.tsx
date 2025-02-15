"use client";
import React, { ChangeEvent, FocusEvent, ReactNode, useState } from 'react';
import EyeOpenIcon from '../icons/EyeOpenIcon';
import { COLORS } from '@/app/utilities/constants/colors';
import EyeClosedIcon from '../icons/EyeClosedIcon';

type InputProps = {
    label?: string;
    type?: string;
    name: string;
    value: string;
    placeholder?: string;
    icon?: ReactNode;
    maxLength?: number;
    isPassword?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
};

const MAX_CHARS = 40;

const InputCustom: React.FC<InputProps> = ({
    label,
    type = 'text',
    name,
    value,
    icon,
    maxLength = MAX_CHARS,
    isPassword = false,
    placeholder = '',
    onChange,
    onBlur,
    error = '',
    required = false,
    disabled = false,
    autoComplete = 'off'
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(e);
    };

    const [visible, setVisible] = useState<boolean>(false);

    return (
      <div className="relative input-wrapper flex flex-col">
        {icon &&
        <div className='absolute top-10 left-2'>{icon}</div>
        }

        {isPassword &&
        <button onClick={() => setVisible(!visible)} className='absolute right-2 top-10'>
          {visible
          ? <EyeOpenIcon color={COLORS.darkGray} />
          : <EyeClosedIcon color={COLORS.darkGray} />
          }
        </button>
        }


        {label && (
          <label htmlFor={name} className="input-label font-semibold text-secondary pb-2">
              {label} {required && '*'}
          </label>
        )}
        <input
          maxLength={maxLength}
          type={isPassword ? visible ? "text" : "password" : type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`${icon ? `pl-10 ${ isPassword ? "pr-9" : "pr-2" }` : `${ isPassword ? "pl-2 pr-9" : "px-2" }` } 
          flex w-full text-secondary text-base font-medium input-field border-2 border-thirdly focus:outline-none py-2 rounded-[0.4rem]`}
        />
        {error && <p className="input-error">{error}</p>}
      </div>
    );
};

export default InputCustom;

