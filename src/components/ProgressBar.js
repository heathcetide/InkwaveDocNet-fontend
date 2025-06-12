import React from "react";
import { clsx } from "clsx";

export const ProgressBar = ({
                                value = 0,
                                max = 100,
                                color = "cyan", // cyan | emerald | violet | custom
                                striped = false,
                                animated = true,
                                height = "h-3",
                                radius = "rounded-full", // rounded-full | rounded-md | none
                                label = false,
                                showValue = false,
                                className = "",
                            }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const colorMap = {
        cyan: "bg-cyan-500",
        emerald: "bg-emerald-500",
        violet: "bg-violet-500",
    };

    const backgroundClass = colorMap[color] || color || "bg-gray-500";

    const barClass = clsx(
        "transition-all duration-500 ease-in-out",
        backgroundClass,
        striped &&
        "bg-[linear-gradient(45deg,_rgba(255,255,255,0.15)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.15)_50%,_rgba(255,255,255,0.15)_75%,_transparent_75%,_transparent)] bg-[length:1rem_1rem]",
        animated && striped && "animate-[progress-stripes_1s_linear_infinite]"
    );

    return (
        <div className="w-full space-y-1">
            {label && (
                <div className="flex justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    <span>{typeof label === "string" ? label : "进度"}</span>
                    {showValue && <span>{Math.round(percentage)}%</span>}
                </div>
            )}
            <div
                className={clsx(
                    "w-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden",
                    height,
                    radius,
                    className
                )}
            >
                <div
                    className={clsx("h-full", barClass)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
