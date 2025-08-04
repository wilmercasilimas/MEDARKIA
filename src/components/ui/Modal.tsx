import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, titulo, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-xl relative">
        {titulo && <h3 className="text-lg font-semibold mb-4">{titulo}</h3>}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
