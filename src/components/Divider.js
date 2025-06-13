import React from "react";
import clsx from "clsx";

export const Divider = ({
                            label = "",
                            className = "",
                            orientation = "horizontal", // "horizontal" or "vertical"
                            withLabel = false,
                        }) => {
    if (orientation === "vertical") {
        return (
            <div
                className={clsx(
                    "w-px h-full bg-neutral-300 dark:bg-neutral-700",
                    className
                )}
            />
        );
    }

    return (
        <div className={clsx("flex items-center w-full", className)}>
            <div className="flex-grow h-px bg-neutral-300 dark:bg-neutral-700" />
            {withLabel && label && (
                <span className="mx-4 text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
          {label}
        </span>
            )}
            <div className="flex-grow h-px bg-neutral-300 dark:bg-neutral-700" />
        </div>
    );
};
