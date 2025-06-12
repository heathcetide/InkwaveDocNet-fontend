// components/TimePicker.js
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";

export const TimePicker = ({ value, onChange }) => {
    const [open, setOpen] = React.useState(false);
    const format = (t) => dayjs().hour(t.h).minute(t.m).format("HH:mm");

    const times = Array.from({ length: 24 * 4 }, (_, i) => ({
        h: Math.floor(i / 4),
        m: (i % 4) * 15,
    }));

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button className="w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm text-left shadow-sm">
                    {value ? format(value) : "选择时间"}
                </button>
            </Popover.Trigger>
            <Popover.Content className="z-50 max-h-64 overflow-auto w-32 rounded-xl bg-white shadow-lg p-2">
                <div className="grid grid-cols-1 gap-1">
                    {times.map((t, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                onChange?.(t);
                                setOpen(false);
                            }}
                            className="cursor-pointer px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                            {format(t)}
                        </div>
                    ))}
                </div>
            </Popover.Content>
        </Popover.Root>
    );
};
