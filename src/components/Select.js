// components/Select.js
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

export const Select = React.forwardRef(
    ({ options = [], value, onChange, placeholder = "请选择", className, ...props }, ref) => (
        <SelectPrimitive.Root value={value} onValueChange={onChange}>
            <SelectPrimitive.Trigger
                ref={ref}
                className={clsx(
                    "inline-flex w-full items-center justify-between rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                    className
                )}
                {...props}
            >
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon className="ml-2">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                    className="z-50 rounded-xl bg-white shadow-lg animate-slide-down-and-fade w-[var(--radix-select-trigger-width)]"
                >
                    <SelectPrimitive.Viewport className="p-2">
                        {options.map((opt) => (
                            <SelectPrimitive.Item
                                key={opt.value}
                                value={opt.value}
                                className="relative flex items-center px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer select-none outline-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-600"
                            >
                                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                                <SelectPrimitive.ItemIndicator className="absolute right-3">
                                    <Check className="w-4 h-4 text-blue-600" />
                                </SelectPrimitive.ItemIndicator>
                            </SelectPrimitive.Item>
                        ))}
                    </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    )
);
Select.displayName = "Select";
