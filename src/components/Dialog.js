
// components/Dialog.js
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { X } from "lucide-react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = React.forwardRef(
    ({ className, children, showClose = true, ...props }, ref) => (
        <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
            <DialogPrimitive.Content
                ref={ref}
                className={clsx(
                    "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl",
                    "data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out",
                    className
                )}
                {...props}
            >
                {children}
                {showClose && (
                    <DialogPrimitive.Close className="absolute right-3 top-3 rounded-full p-1 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                        <X className="h-4 w-4" />
                        <span className="sr-only">关闭</span>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    )
);
DialogContent.displayName = "DialogContent";