import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { clsx } from "clsx";

export const HoverCard = ({
                              trigger,
                              children,
                              openDelay = 300,
                              closeDelay = 150,
                              side = "top",
                              align = "center",
                              color = "emerald",
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
        <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay}>
            <HoverCardPrimitive.Trigger asChild>
                {trigger}
            </HoverCardPrimitive.Trigger>
            <HoverCardPrimitive.Portal>
                <HoverCardPrimitive.Content
                    side={side}
                    align={align}
                    sideOffset={8}
                    className={clsx(
                        "z-50 max-w-sm rounded-2xl p-4 border shadow-xl backdrop-blur-xl",
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
                    <HoverCardPrimitive.Arrow className="fill-current text-white dark:text-neutral-900" />
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Portal>
        </HoverCardPrimitive.Root>
    );
};
