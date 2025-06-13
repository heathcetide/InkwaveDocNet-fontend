import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

const baseStyles =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm disabled:opacity-50 disabled:pointer-events-none";

const variantMap = {
    cyan: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
    green: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    purple: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    ghost: "bg-transparent text-black hover:bg-gray-100",
};

const sizeMap = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5",
};

export const Button = React.forwardRef(
    (
        {
            asChild = false,
            className,
            variant = "cyan",
            size = "md",
            type = "button",
            children,
            loading = false,
            icon,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                className={clsx(
                    baseStyles,
                    variantMap[variant] || variantMap.cyan,
                    sizeMap[size],
                    className
                )}
                {...props}
            >
                {loading ? (
                    <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                    icon && <span className="mr-2">{icon}</span>
                )}
                {children}
            </Comp>
        );
    }
);
Button.displayName = "Button";
