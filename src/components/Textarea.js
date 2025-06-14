import * as React from "react";
import clsx from "clsx";

export const Textarea = React.forwardRef(
    ({ className, showCount = false, maxLength, value, onChange, ...props }, ref) => {
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
        }, [composedRef, value, autoResize]); // 依赖 value，避免错过 resize

        return (
            <div className="space-y-1">
        <textarea
            ref={composedRef}
            value={value}
            onChange={(e) => {
                onChange?.(e);
                autoResize(e.target);
            }}
            maxLength={maxLength}
            className={clsx(
                "w-full min-h-[3rem] resize-none rounded-2xl border border-gray-300 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                className
            )}
            {...props}
        />
                {showCount && maxLength && (
                    <div className="text-sm text-right text-gray-500">
                        {value?.length || 0}/{maxLength}
                    </div>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
