"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
};

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-100 dark:bg-green-800"
      : type === "error"
        ? "bg-red-100 dark:bg-red-800"
        : "bg-blue-100 dark:bg-blue-800";

  const textColor =
    type === "success"
      ? "text-green-800 dark:text-green-100"
      : type === "error"
        ? "text-red-800 dark:text-red-100"
        : "text-blue-800 dark:text-blue-100";

  const iconColor =
    type === "success"
      ? "text-green-500 dark:text-green-300"
      : type === "error"
        ? "text-red-500 dark:text-red-300"
        : "text-blue-500 dark:text-blue-300";

  const icon =
    type === "success" ? (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : type === "error" ? (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ) : (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className={`flex items-center rounded-lg p-3 shadow-lg ${bgColor} font-sans`}>
        <div className={`mr-2 flex-shrink-0 ${iconColor}`}>{icon}</div>
        <div className={`text-sm font-medium ${textColor}`}>{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{
      id: string;
      message: string;
      type: "success" | "error" | "info";
      duration?: number;
    }>
  >([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
    duration?: number
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => {
    return typeof document !== "undefined"
      ? createPortal(
          toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => closeToast(toast.id)}
            />
          )),
          document.body
        )
      : null;
  };

  return { showToast, ToastContainer };
}
