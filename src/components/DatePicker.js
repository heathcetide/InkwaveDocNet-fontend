// components/DatePicker.js
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";

export const DatePicker = ({ value, onChange, className }) => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(value ? dayjs(value) : dayjs());

    const handleSelect = (d) => {
        onChange?.(d.toDate());
        setOpen(false);
    };

    const renderDays = () => {
        const start = date.startOf("month").startOf("week");
        return Array.from({ length: 42 }, (_, i) => {
            const current = start.add(i, "day");
            const isCurrentMonth = current.month() === date.month();
            return (
                <div
                    key={i}
                    onClick={() => handleSelect(current)}
                    className={`w-8 h-8 flex items-center justify-center text-sm rounded cursor-pointer ${
                        isCurrentMonth ? "text-black" : "text-gray-400"
                    } hover:bg-blue-100`}
                >
                    {current.date()}
                </div>
            );
        });
    };

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    className={`w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm text-left ${className}`}
                >
                    {value ? dayjs(value).format("YYYY-MM-DD") : "选择日期"}
                </button>
            </Popover.Trigger>
            <Popover.Content className="z-50 w-64 bg-white p-3 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-2">
                    <button onClick={() => setDate(date.subtract(1, "month"))}>←</button>
                    <span className="text-sm font-semibold">
            {date.format("YYYY 年 MM 月")}
          </span>
                    <button onClick={() => setDate(date.add(1, "month"))}>→</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                    {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
                        <div key={d}>{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-1">{renderDays()}</div>
            </Popover.Content>
        </Popover.Root>
    );
};
