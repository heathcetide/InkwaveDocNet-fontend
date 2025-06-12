import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export const Accordion = ({
                              items = [], // [{ title, content }]
                              allowMultiple = false,
                              defaultActive = [], // array of indexes
                              themeColor = "cyan",
                          }) => {
    const [activeIndexes, setActiveIndexes] = useState(defaultActive);

    const toggleIndex = (index) => {
        if (allowMultiple) {
            setActiveIndexes((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            );
        } else {
            setActiveIndexes((prev) => (prev[0] === index ? [] : [index]));
        }
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => {
                const isActive = activeIndexes.includes(index);

                return (
                    <div
                        key={index}
                        className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleIndex(index)}
                            className={clsx(
                                "w-full flex justify-between items-center px-4 py-3 text-left font-medium",
                                isActive
                                    ? `bg-${themeColor}-50 dark:bg-${themeColor}-900/20 text-${themeColor}-700 dark:text-${themeColor}-300`
                                    : "bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200"
                            )}
                        >
                            {item.title}
                            <ChevronDown
                                className={clsx(
                                    "w-5 h-5 transform transition-transform duration-200",
                                    isActive && "rotate-180"
                                )}
                            />
                        </button>
                        {isActive && (
                            <div className="px-4 pb-4 text-sm text-neutral-700 dark:text-neutral-300">
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
