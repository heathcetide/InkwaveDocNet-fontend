import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { Popover } from "@headlessui/react";
import { PaintBucket } from "lucide-react";

export const ColorPicker = ({
                                color = "#14b8a6",
                                onChange = () => {},
                                withAlpha = false,
                                label = "选择颜色",
                            }) => {
    const [currentColor, setCurrentColor] = useState(color);

    const handleChange = (color) => {
        setCurrentColor(color.hex);
        onChange(color.hex);
    };

    return (
        <Popover className="relative">
            <Popover.Button className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm hover:shadow transition">
                <div className="w-4 h-4 rounded-sm border border-neutral-300" style={{ background: currentColor }} />
                <span>{label}</span>
                <PaintBucket className="w-4 h-4 text-neutral-400" />
            </Popover.Button>

            <Popover.Panel className="absolute z-50 mt-2">
                <ChromePicker
                    disableAlpha={!withAlpha}
                    color={currentColor}
                    onChange={handleChange}
                />
            </Popover.Panel>
        </Popover>
    );
};
