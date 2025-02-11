import React, { useEffect, ReactNode } from "react";

type PopupProps = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  children: ReactNode;
};

const Popup: React.FC<PopupProps> = ({ isOpen, setIsOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden"); // Cleanup on unmount
    };
  }, [isOpen]);

  return (
    <div
      className={`z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-80 transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
