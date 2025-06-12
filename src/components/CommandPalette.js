import React, { useEffect, useState, useCallback } from "react";
import { Command, CommandInput, CommandList, CommandItem } from "cmdk";
import { Search, Terminal } from "lucide-react";
import { clsx } from "clsx";

export const CommandPalette = ({
                                   actions = [], // [{ label, icon, shortcut, onTrigger }]
                                   shortcutKey = ["Control", "k"],
                                   placeholder = "搜索命令...",
                                   themeColor = "cyan",
                               }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const handleKeyDown = useCallback((e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            setOpen((prev) => !prev);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const filtered = actions.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="relative z-[100]">
            {open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            )}

            {open && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl">
                    <Command shouldFilter={false}>
                        <div className="flex items-center px-4 border-b border-neutral-200 dark:border-neutral-700">
                            <Search className="w-4 h-4 mr-2 text-neutral-500" />
                            <CommandInput
                                autoFocus
                                placeholder={placeholder}
                                value={query}
                                onValueChange={setQuery}
                                className="w-full px-2 py-3 text-sm bg-transparent text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400"
                            />
                        </div>
                        <CommandList className="max-h-[300px] overflow-y-auto py-2">
                            {filtered.length === 0 && (
                                <div className="px-4 py-2 text-sm text-neutral-500">无匹配命令</div>
                            )}
                            {filtered.map((action, idx) => (
                                <CommandItem
                                    key={idx}
                                    onSelect={() => {
                                        action.onTrigger();
                                        setOpen(false);
                                    }}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-2 text-sm cursor-pointer",
                                        `hover:bg-${themeColor}-50 dark:hover:bg-${themeColor}-800/40`
                                    )}
                                >
                                    {action.icon || <Terminal className="w-4 h-4" />}
                                    <span className="flex-1 text-neutral-800 dark:text-neutral-100">{action.label}</span>
                                    {action.shortcut && (
                                        <span className="text-xs text-neutral-400">{action.shortcut.join(" + ")}</span>
                                    )}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </div>
            )}
        </div>
    );
};
