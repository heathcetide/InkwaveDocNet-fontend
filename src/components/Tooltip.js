// components/Tooltip.js
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";

/**
 * Tooltip 组件
 * - 自动注入 Provider，避免 "Tooltip must be used within TooltipProvider" 错误
 * - 允许通过 props 自定义 delayDuration / skipDelayDuration
 */
export const TooltipTrigger = TooltipPrimitive.Trigger;
/** 若需全局统一配置，可显式使用 TooltipProvider */
export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = ({
                            delayDuration = 300,
                            skipDelayDuration = 0,
                            children,
                            ...props
                        }) => (
    <TooltipPrimitive.Provider
        delayDuration={delayDuration}
        skipDelayDuration={skipDelayDuration}
    >
        <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
);

export const TooltipContent = React.forwardRef(
    (
        {
            className,
            side = "top",
            align = "center",
            withArrow = true,
            ...props
        },
        ref
    ) => (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                ref={ref}
                side={side}
                align={align}
                sideOffset={6}
                collisionPadding={8}
                className={clsx(
                    "z-50 rounded-md bg-black px-3 py-1.5 text-xs text-white shadow-md",
                    "will-change-[transform,opacity] data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
                    className
                )}
                {...props}
            >
                {props.children}
                {withArrow && <TooltipPrimitive.Arrow className="fill-black" />}
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    )
);
TooltipContent.displayName = "TooltipContent";