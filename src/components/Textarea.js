// components/Textarea.js
import * as React from "react";
import clsx from "clsx";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    const innerRef = React.useRef(null);
    const composedRef = ref || innerRef;

    const autoResize = React.useCallback((el) => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, []);

    React.useEffect(() => {
        if (composedRef?.current) {
            autoResize(composedRef.current);
        }
    }, [composedRef, autoResize]);

    return (
        <textarea
            ref={composedRef}
            onInput={(e) => autoResize(e.target)}
            className={clsx(
                "w-full min-h-[3rem] resize-none rounded-2xl border border-gray-300 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                className
            )}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";
