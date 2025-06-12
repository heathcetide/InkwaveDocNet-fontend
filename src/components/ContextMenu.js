import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { clsx } from "clsx";

export const ContextMenu = ({
                                children,
                                items = [],
                                color = "cyan",
                                className = "",
                            }) => {
    const isPresetColor = ["cyan", "emerald", "violet"].includes(color);
    const bgColor = isPresetColor
        ? `bg-${color}-500/10 dark:bg-${color}-400/10`
        : `bg-[${color}]`;
    const hoverColor = isPresetColor
        ? `hover:bg-${color}-500/20 dark:hover:bg-${color}-400/20`
        : `hover:bg-[${color}]`;

    return (
        <ContextMenuPrimitive.Root>
            <ContextMenuPrimitive.Trigger asChild>
                {children}
            </ContextMenuPrimitive.Trigger>
            <ContextMenuPrimitive.Portal>
                <ContextMenuPrimitive.Content
                    className={clsx(
                        "z-50 min-w-[180px] rounded-xl p-1 backdrop-blur-md border shadow-lg",
                        "bg-white/80 dark:bg-neutral-900/80 border-neutral-300 dark:border-neutral-700",
                        "animate-in fade-in zoom-in-95",
                        bgColor,
                        className
                    )}
                >
                    {items.map((item, index) => {
                        if (item.type === "separator") {
                            return <ContextMenuPrimitive.Separator key={index} className="my-1 h-px bg-neutral-300 dark:bg-neutral-700" />;
                        }
                        return (
                            <ContextMenuPrimitive.Item
                                key={index}
                                className={clsx(
                                    "flex items-center justify-between gap-2 text-sm px-3 py-2 rounded-md cursor-pointer select-none",
                                    "text-black dark:text-white hover:text-white dark:hover:text-black",
                                    hoverColor
                                )}
                                onSelect={item.onSelect}
                            >
                                <div className="flex items-center gap-2">
                                    {item.icon && <span>{item.icon}</span>}
                                    <span>{item.label}</span>
                                </div>
                                {item.shortcut && (
                                    <span className="text-xs opacity-60">{item.shortcut}</span>
                                )}
                            </ContextMenuPrimitive.Item>
                        );
                    })}
                </ContextMenuPrimitive.Content>
            </ContextMenuPrimitive.Portal>
        </ContextMenuPrimitive.Root>
    );
};