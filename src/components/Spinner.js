import React from "react";
import { clsx } from "clsx";

export const Spinner = ({
                            size = "md", // sm | md | lg
                            color = "cyan", // cyan | emerald | violet | custom
                            thickness = "4", // Tailwind border width e.g. 2, 4
                            className = "",
                        }) => {
    const sizeMap = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-10 h-10",
    };

    const borderClass = {
        cyan: "border-cyan-500",
        emerald: "border-emerald-500",
        violet: "border-violet-500",
    }[color] || color || "border-gray-500";

    return (
        <div
            className={clsx(
                "animate-spin rounded-full border-t-transparent border-solid",
                `border-${thickness}`,
                borderClass,
                sizeMap[size],
                className
            )}
        />
    );
};
