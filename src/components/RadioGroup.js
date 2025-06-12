// components/RadioGroup.js
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import clsx from "clsx";

export const RadioGroup = ({ options, value, onChange, className }) => (
    <RadioGroupPrimitive.Root
        value={value}
        onValueChange={onChange}
        className={clsx("flex flex-col gap-2", className)}
    >
        {options.map((opt) => (
            <label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
            >
                <RadioGroupPrimitive.Item
                    value={opt.value}
                    className="h-4 w-4 rounded-full border border-gray-400 data-[state=checked]:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </RadioGroupPrimitive.Indicator>
                </RadioGroupPrimitive.Item>
                <span className="text-sm select-none">{opt.label}</span>
            </label>
        ))}
    </RadioGroupPrimitive.Root>
);
