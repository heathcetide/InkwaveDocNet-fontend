import * as React from "react";
import clsx from "clsx";
import { cn } from "../lib/utils";

const variantMap = {
    cyan: {
        ring: "focus:ring-cyan-500",
        border: "focus:border-cyan-500",
    },
    green: {
        ring: "focus:ring-green-500",
        border: "focus:border-green-500",
    },
    purple: {
        ring: "focus:ring-purple-500",
        border: "focus:border-purple-500",
    },
};

export const Input = React.forwardRef(
    ({ className, variant = "cyan", icon, error, type = "text", prefixIcon, ...props }, ref) => {
        const styles = variantMap[variant] || variantMap.cyan;

        return (
            <div className="relative">
                {(icon || prefixIcon) && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {icon || prefixIcon}
                    </span>
                )}
                <input
                    ref={ref}
                    type={type}
                    value={props.value || ""}
                    onChange={(e) => {
                        if (props.onChange) {
                            props.onChange(e.target.value || "");
                        }
                    }}
                    className={clsx(
                        "w-full rounded-2xl border px-4 py-2 text-sm shadow-sm bg-white transition-all duration-200 ease-in-out",
                        "focus:outline-none focus:ring-2",
                        styles.ring,
                        styles.border,
                        (icon || prefixIcon) && "pl-10",
                        error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-500 mt-1 transition-opacity duration-200 ease-in-out">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
