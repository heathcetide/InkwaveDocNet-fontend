import { useEffect } from "react";

/**
 * KeyboardShortcutListener
 * @param shortcuts Array<{ keyCombo: string, callback: Function, description?: string }>
 * @example keyCombo: "ctrl+s", "shift+n", "alt+enter"
 */
export const useKeyboardShortcuts = (shortcuts = []) => {
    useEffect(() => {
        const handler = (e) => {
            const combo = [];
            if (e.ctrlKey) combo.push("ctrl");
            if (e.metaKey) combo.push("meta");
            if (e.altKey) combo.push("alt");
            if (e.shiftKey) combo.push("shift");
            if (typeof e.key === "string") {
                combo.push(e.key.toLowerCase());
            } else {
                return; // 非法按键，直接忽略
            }
            const pressed = combo.join("+");

            shortcuts.forEach((s) => {
                if ((s.keyCombo || "").toLowerCase() === pressed) {
                    e.preventDefault();
                    s.callback();
                }
            });
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [shortcuts]);
};
