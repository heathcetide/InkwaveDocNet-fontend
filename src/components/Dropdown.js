import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

/** 简洁下拉菜单（Radix DropdownMenu + Tailwind） */
export const Dropdown = ({ trigger, children, className, sideOffset = 4 }) => (
    <DropdownMenu.Root>
        {/* 触发器：既可传字符串，也可自定义按钮节点 */}
        <DropdownMenu.Trigger asChild>
            {typeof trigger === "string" ? (
                <button className="inline-flex items-center rounded-2xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {trigger}
                </button>
            ) : (
                trigger
            )}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
            <DropdownMenu.Content
                sideOffset={sideOffset}
                className={clsx(
                    "z-50 min-w-[8rem] rounded-xl bg-white p-2 shadow-lg",
                    "animate-slide-down-and-fade will-change-[transform,opacity]",
                    className
                )}
            >
                {children}
                <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
);

/* 子组件：Item / Separator，方便调用 */
Dropdown.Item = ({ children, className, inset, ...props }) => (
    <DropdownMenu.Item
        className={clsx(
            "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-gray-700",
            "outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600",
            inset && "pl-8",
            className
        )}
        {...props}
    >
        {children}
    </DropdownMenu.Item>
);

Dropdown.Separator = (props) => (
    <DropdownMenu.Separator className="my-1 h-px bg-gray-200" {...props} />
);
