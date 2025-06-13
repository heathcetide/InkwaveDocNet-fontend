// components/Combobox.js
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";

export const Combobox = ({ options, value, onChange, placeholder = "请选择", className }) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const filtered = options.filter((opt) =>
        (opt.label || "").toLowerCase().includes((search || "").toLowerCase())
    );

    const selectedLabel = options.find((o) => o.value === value)?.label;

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <button
                    type="button"
                    className={clsx(
                        "w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                        className
                    )}
                >
                    {selectedLabel || <span className="text-gray-400">{placeholder}</span>}
                </button>
            </Popover.Trigger>
            <Popover.Content className="z-50 w-64 rounded-xl bg-white p-2 shadow-lg" sideOffset={4}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-2 w-full rounded border px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="搜索..."
                />
                <div className="max-h-60 overflow-auto space-y-1">
                    {filtered.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-gray-100"
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            </Popover.Content>
        </Popover.Root>
    );
};
