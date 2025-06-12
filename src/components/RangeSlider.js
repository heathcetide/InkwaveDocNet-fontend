// components/RangeSlider.js
import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";

export const RangeSlider = ({
                                value,
                                onChange,
                                min = 0,
                                max = 100,
                                step = 1,
                                className,
                            }) => (
    <SliderPrimitive.Root
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        className={clsx("relative flex items-center w-full h-5 select-none", className)}
    >
        <SliderPrimitive.Track className="bg-gray-200 relative flex-grow rounded-full h-1">
            <SliderPrimitive.Range className="absolute bg-blue-600 h-full rounded-full" />
        </SliderPrimitive.Track>
        {value.map((_, idx) => (
            <SliderPrimitive.Thumb
                key={idx}
                className="block w-4 h-4 bg-white border border-blue-600 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        ))}
    </SliderPrimitive.Root>
);
