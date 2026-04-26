"use client";

import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-4 animate-in zoom-in-95 duration-200">
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
