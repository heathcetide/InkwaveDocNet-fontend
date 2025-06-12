// components/TimeRangePicker.js
import React from "react";
import { TimePicker } from "./TimePicker";

export const TimeRangePicker = ({ value = [], onChange }) => {
    const [start, end] = value;

    const handleStart = (val) => onChange?.([val, end]);
    const handleEnd = (val) => onChange?.([start, val]);

    return (
        <div className="flex gap-2">
            <TimePicker value={start} onChange={handleStart} />
            <span className="self-center text-sm text-gray-500">到</span>
            <TimePicker value={end} onChange={handleEnd} />
        </div>
    );
};
