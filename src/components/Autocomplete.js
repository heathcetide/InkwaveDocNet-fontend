// components/Autocomplete.js
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";

export const Autocomplete = ({ options, value = "", onChange, placeholder = "输入以搜索", className }) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState(value);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (val) => {
    setSearch(val.label);
    onChange(val.value);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
          className={clsx(
            "w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            className
          )}
        />
      </Popover.Trigger>
      {filtered.length > 0 && (
        <Popover.Content className="z-50 w-full rounded-xl bg-white p-2 shadow-lg" sideOffset={4}>
          <div className="max-h-60 overflow-auto space-y-1">
            {filtered.map((opt) => (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt)}
                className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-gray-100"
              >
                {opt.label}
              </div>
            ))}
          </div>
        </Popover.Content>
      )}
    </Popover.Root>
  );
};
