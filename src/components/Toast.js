
// components/Toast.js
import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import clsx from "clsx";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ({ className, ...props }) => (
    <ToastPrimitive.Viewport
        className={clsx(
            "fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80 max-w-full outline-none",
            className
        )}
        {...props}
    />
);

export const Toast = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitive.Root
        ref={ref}
        className={clsx(
            "bg-white border border-gray-200 shadow-xl rounded-xl p-4",
            "grid grid-cols-[auto_1fr_auto] gap-3 items-center",
            "data-[state=open]:animate-toast-in data-[state=closed]:animate-toast-out",
            className
        )}
        {...props}
    />
));
Toast.displayName = "Toast";
export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export const ToastAction = ToastPrimitive.Action;
