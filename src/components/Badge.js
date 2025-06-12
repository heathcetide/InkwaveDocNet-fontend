import React from "react";
import { clsx } from "clsx";

export const Badge = ({
                          children,
                          color = "cyan", // cyan | emerald | violet | custom
                          variant = "solid", // solid | soft | outline
                          size = "md", // sm | md | lg
                          rounded = "full", // full | md | none
                          className = "",
                      }) => {
    const sizeMap = {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
    };

    const roundedMap = {
        full: "rounded-full",
        md: "rounded-md",
        none: "rounded-none",
    };

    const colorMap = {
        cyan: {
            solid: "bg-cyan-600 text-white",
            soft: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
            outline: "border border-cyan-500 text-cyan-600",
        },
        emerald: {
            solid: "bg-emerald-600 text-white",
            soft: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
            outline: "border border-emerald-500 text-emerald-600",
        },
        violet: {
            solid: "bg-violet-600 text-white",
            soft: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
            outline: "border border-violet-500 text-violet-600",
        },
    };

    const colorClass = colorMap[color]?.[variant] || "bg-gray-200 text-gray-800";

    return (
        <span
            className={clsx(
                "inline-flex items-center font-medium",
                sizeMap[size],
                roundedMap[rounded],
                colorClass,
                className
            )}
        >
      {children}
    </span>
    );
};
