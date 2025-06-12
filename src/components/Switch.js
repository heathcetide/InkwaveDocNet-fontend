// components/Switch.js
import React from "react";
import { clsx } from "clsx";

export const Switch = ({ checked, onChange, className }) => {
  return (
    <button
      type="button"
      className={clsx(
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
        checked ? "bg-primary-500" : "bg-gray-200 dark:bg-gray-600",
        className
      )}
      onClick={() => onChange(!checked)}
    >
      <span
        className={clsx(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
};
