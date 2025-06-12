// components/Checkbox.js
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { Check } from "lucide-react";

export const Checkbox = React.forwardRef(({ label, className, ...props }, ref) => (
    <label className="flex items-center gap-2 cursor-pointer">
        <CheckboxPrimitive.Root
            ref={ref}
            className={clsx("h-5 w-5 shrink-0 rounded-md border border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", className)}
            {...props}
        >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
                <Check className="h-4 w-4" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && <span className="text-sm select-none">{label}</span>}
    </label>
));
Checkbox.displayName = "Checkbox";

export const CheckboxGroup = ({ className, children }) => <div className={clsx("flex flex-col gap-2", className)}>{children}</div>;
