import React from "react";
import { clsx } from "clsx";

export const Timeline = ({
                             items = [],
                             color = "cyan", // or emerald, violet, or custom
                             className = "",
                         }) => {
    const dotColorMap = {
        cyan: "bg-cyan-500",
        emerald: "bg-emerald-500",
        violet: "bg-violet-500",
    };

    return (
        <div className={clsx("relative border-l pl-6 border-neutral-300 dark:border-neutral-700", className)}>
            {items.map((item, index) => (
                <div key={index} className="relative mb-8">
          <span
              className={clsx(
                  "absolute w-3 h-3 rounded-full top-1.5 -left-1.5 ring-2 ring-white dark:ring-neutral-900",
                  dotColorMap[color] || `bg-[${color}]`
              )}
          ></span>
                    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4 transition-all hover:scale-[1.01]">
                        <div className="text-sm text-neutral-400 dark:text-neutral-500 mb-1">
                            {item.time}
                        </div>
                        <div className="text-base font-medium text-neutral-800 dark:text-white">
                            {item.title}
                        </div>
                        {item.description && (
                            <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                                {item.description}
                            </div>
                        )}
                        {item.icon && <div className="absolute -left-8 top-1.5 text-xl">{item.icon}</div>}
                    </div>
                </div>
            ))}
        </div>
    );
};
