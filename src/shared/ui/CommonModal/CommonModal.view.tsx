"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  container_class?:string;
  replaceClassName?:string;
  modalClassName?: string; // for extra styling
}

export default function CommonModal({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  showCloseButton = true,
  modalClassName = "",
  container_class,
  replaceClassName,
}: CommonModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={"fixed inset-0  z-[999] overflow-y-auto  flex items-center justify-center bg-[#070f1ebb] "+{container_class}}
    >
      <div
        className={replaceClassName??`relative  max-h-[97vh]  z-[999]  bg-transparent rounded-lg shadow-lg w-auto ${modalClassName}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 z-[20] right-4 bg-slate-300 rounded-[50%] px-2 py-0.5 text-gray-800 hover:text-gray-950"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  ,document.body);
}