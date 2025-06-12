// components/MultiSelect.js
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import clsx from "clsx";

export const MultiSelect = ({
                                options,
                                selected = [],
                                onChange,
                                placeholder = "选择...",
                                className,
                            }) => {
    const [open, setOpen] = useState(false);

    const toggle = (val) => {
        const newSelected = selected.includes(val)
            ? selected.filter((v) => v !== val)
            : [...selected, val];
        onChange?.(newSelected);
    };

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    type="button"
                    className={clsx(
                        "flex w-full flex-wrap gap-1 rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                        className
                    )}
                >
                    {selected.length === 0 ? (
                        <span className="text-gray-400">{placeholder}</span>
                    ) : (
                        selected.map((val) => {
                            const label = options.find((o) => o.value === val)?.label || val;
                            return (
                                <span
                                    key={val}
                                    className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600"
                                >
                  {label}
                </span>
                            );
                        })
                    )}
                </button>
            </Popover.Trigger>
            <Popover.Content
                className="z-50 w-56 rounded-xl bg-white p-2 shadow-lg"
                sideOffset={4}
            >
                <div className="flex flex-col gap-1 max-h-60 overflow-auto">
                    {options.map((opt) => (
                        <label
                            key={opt.value}
                            className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 rounded px-2 py-1 hover:bg-gray-100"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(opt.value)}
                                onChange={() => toggle(opt.value)}
                            />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            </Popover.Content>
        </Popover.Root>
    );
};
