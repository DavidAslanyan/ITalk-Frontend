import { ResponseEnum } from "@/app/utilities/enums/response.enum";
import { useRef } from "react";

interface OTPInputProps {
  length?: number;
  value: string;
  response: ResponseEnum | null;
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value, response, onChange }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, char: string) => {
    if (char.length > 1) return; 

    let newOtp = value.split("");
    newOtp[index] = char.toUpperCase();
    onChange(newOtp.join(""));

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    onChange(pastedData.padEnd(length, " "));
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
  };

  const match = response === ResponseEnum.SUCCESS;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={match}
          className={`${match ? 'bg-secondary text-primary' : 'border-gray-300'} w-10 h-12 rounded-sm text-center border  focus:border-thidly focus:ring-thirdly outline-none text-lg font-semibold`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
