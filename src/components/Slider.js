// components/Slider.js
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";

export const Slider = React.forwardRef(
    ({ value, onChange, min = 0, max = 100, step = 1, className, ...props }, ref) => (
        <SliderPrimitive.Root
            ref={ref}
            value={[value]}
            onValueChange={(val) => onChange(val[0])}
            min={min}
            max={max}
            step={step}
            className={clsx("relative flex w-full items-center h-5 select-none touch-none", className)}
            {...props}
        >
            <SliderPrimitive.Track className="relative flex-grow h-1 bg-gray-200 rounded-full">
                <SliderPrimitive.Range className="absolute h-full bg-blue-600 rounded-full" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="w-4 h-4 bg-white border border-blue-600 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </SliderPrimitive.Root>
    )
);
Slider.displayName = "Slider";
