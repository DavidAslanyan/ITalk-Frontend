import React, { useEffect, ReactNode } from "react";

type PopupProps = {
  isOpen: boolean;
  setIsOpen?: (arg: boolean) => void;
  children: ReactNode;
  maxWidth?: string
};

const LargePopup: React.FC<PopupProps> = ({ isOpen, setIsOpen, children, maxWidth = "max-w-[80rem]" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden"); 
    };
  }, [isOpen]);

  return (
    <div
      className={`z-50 px-4 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`${maxWidth} bg-white h-auto p-6 rounded-lg mx-5 shadow-lg w-full transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default LargePopup;
