import React, { ChangeEvent, FocusEvent } from 'react'

type InputUnderlinedProps = {
    type?: string;
    name: string;
    value: string;
    placeholder?: string;
    maxLength?: number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
}

const MAX_CHARS = 40;

const InputUnderlined: React.FC<InputUnderlinedProps> = ({
  type = 'text',
  name,
  value,
  maxLength = MAX_CHARS,
  placeholder = '',
  onChange,
  onBlur,
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

  return (
    <div className='border-b-2 border-b-secondary'>
      <input
          maxLength={maxLength}
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          autoFocus
          className={`text-lg font-semibold text-secondary bg-backPrimary border-none focus:outline-none`}
        />
    </div>
  )
}

export default InputUnderlined;

