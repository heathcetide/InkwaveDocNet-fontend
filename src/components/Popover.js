import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { clsx } from "clsx";

export const Popover = ({
                            trigger,
                            children,
                            side = "bottom",
                            align = "center",
                            color = "cyan",
                            className = "",
                        }) => {
    const isPresetColor = ["cyan", "emerald", "violet"].includes(color);
    const bgColor = isPresetColor
        ? `bg-${color}-500/20 dark:bg-${color}-400/20`
        : `bg-[${color}]`;
    const borderColor = isPresetColor
        ? `border-${color}-500`
        : `border-[${color}]`;

    return (
        <PopoverPrimitive.Root>
            <PopoverPrimitive.Trigger asChild>
                {trigger}
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    side={side}
                    align={align}
                    sideOffset={8}
                    className={clsx(
                        "z-50 rounded-2xl p-4 shadow-xl border backdrop-blur-xl",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=open]:fade-in data-[state=closed]:fade-out",
                        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
                        "transition-all duration-300",
                        bgColor,
                        borderColor,
                        className
                    )}
                >
                    {children}
                    <PopoverPrimitive.Arrow className="fill-current text-white dark:text-neutral-900" />
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
};
