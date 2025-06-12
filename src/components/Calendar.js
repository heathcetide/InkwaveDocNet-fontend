// components/Calendar.js
import React from "react";
import { DatePicker } from "./DatePicker";

export const Calendar = ({ value, onChange }) => {
    return (
        <div className="w-fit border p-4 rounded-xl shadow">
            <DatePicker value={value} onChange={onChange} />
        </div>
    );
};
