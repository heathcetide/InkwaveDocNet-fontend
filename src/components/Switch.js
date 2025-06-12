
// components/Switch.js
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import clsx from "clsx";

const SIZE_MAP = {
    sm: {
        root: "h-5 w-9",
        thumb: "h-3 w-3 translate-x-0.5 data-[state=checked]:translate-x-5",
    },
    md: {
        root: "h-6 w-11",
        thumb: "h-4 w-4 translate-x-1 data-[state=checked]:translate-x-6",
    },
    lg: {
        root: "h-7 w-14",
        thumb: "h-5 w-5 translate-x-1.5 data-[state=checked]:translate-x-7",
    },
};

export const Switch = React.forwardRef(({ className, size = "md", ...props }, ref) => {
    const { root, thumb } = SIZE_MAP[size] || SIZE_MAP.md;
    return (
        <SwitchPrimitive.Root
            ref={ref}
            className={clsx(
                "relative inline-flex shrink-0 cursor-pointer rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 data-[state=checked]:bg-green-500",
                root,
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={clsx(
                    "block rounded-full bg-white shadow-lg transform transition-transform",
                    thumb
                )}
            />
        </SwitchPrimitive.Root>
    );
});
Switch.displayName = "Switch";
