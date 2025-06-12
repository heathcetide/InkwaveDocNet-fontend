import React from "react";
import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";

export const Breadcrumbs = ({
                                items = [], // [{ label, href, icon }]
                                separator = <ChevronRight className="w-4 h-4 text-neutral-400" />,
                                className = "",
                            }) => {
    return (
        <nav className={clsx("flex items-center space-x-1 text-sm", className)} aria-label="Breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-1">
                        {index > 0 && <span className="mx-1">{separator}</span>}
                        {!isLast ? (
                            <a
                                href={item.href}
                                className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-cyan-500 transition-colors"
                            >
                                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                                <span>{item.label}</span>
                            </a>
                        ) : (
                            <span className="flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                                <span>{item.label}</span>
              </span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};