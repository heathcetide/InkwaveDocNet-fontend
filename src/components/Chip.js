import React from "react";
import { clsx } from "clsx";

export const Chip = ({
                         children,
                         icon, // left-side icon (optional)
                         onClose, // callback when close icon clicked
                         color = "emerald", // cyan | emerald | violet
                         variant = "soft", // solid | soft | outline
                         rounded = "full", // full | md | none
                         className = "",
                     }) => {
    const baseColor = {
        emerald: {
            solid: "bg-emerald-600 text-white",
            soft: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
            outline: "border border-emerald-500 text-emerald-600",
        },
        cyan: {
            solid: "bg-cyan-600 text-white",
            soft: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
            outline: "border border-cyan-500 text-cyan-600",
        },
        violet: {
            solid: "bg-violet-600 text-white",
            soft: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
            outline: "border border-violet-500 text-violet-600",
        },
    }[color]?.[variant] || "bg-gray-200 text-gray-800";

    const roundedClass = {
        full: "rounded-full",
        md: "rounded-md",
        none: "rounded-none",
    }[rounded];

    return (
        <span
            className={clsx(
                "inline-flex items-center px-3 py-1 text-sm font-medium gap-1",
                baseColor,
                roundedClass,
                className
            )}
        >
      {icon && <span className="mr-1 text-sm">{icon}</span>}
            {children}
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-1 text-inherit hover:opacity-70"
                >
                    &times;
                </button>
            )}
    </span>
    );
};