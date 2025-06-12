// components/DateRangePicker.js
import React from "react";
import { DatePicker } from "./DatePicker";

export const DateRangePicker = ({ value = [], onChange }) => {
    const [start, end] = value;

    const handleStart = (date) => onChange?.([date, end]);
    const handleEnd = (date) => onChange?.([start, date]);

    return (
        <div className="flex gap-2">
            <DatePicker value={start} onChange={handleStart} />
            <span className="self-center text-gray-500 text-sm">到</span>
            <DatePicker value={end} onChange={handleEnd} />
        </div>
    );
};
