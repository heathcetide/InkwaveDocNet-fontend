import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { clsx } from "clsx";

export const AlertDialog = ({
                                trigger,
                                title = "确认操作",
                                description = "此操作不可撤销，请确认是否继续。",
                                confirmText = "确定",
                                cancelText = "取消",
                                onConfirm = () => {},
                                color = "red",
                                className = "",
                            }) => {
    const btnColor = {
        red: "bg-red-600 hover:bg-red-700",
        cyan: "bg-cyan-600 hover:bg-cyan-700",
        emerald: "bg-emerald-600 hover:bg-emerald-700",
        violet: "bg-violet-600 hover:bg-violet-700",
    }[color] || `bg-[${color}]`;

    return (
        <AlertDialogPrimitive.Root>
            <AlertDialogPrimitive.Trigger asChild>
                {trigger}
            </AlertDialogPrimitive.Trigger>
            <AlertDialogPrimitive.Portal>
                <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in" />
                <AlertDialogPrimitive.Content
                    className={clsx(
                        "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                        "w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 border",
                        "shadow-2xl animate-in fade-in-90 zoom-in-95",
                        className
                    )}
                >
                    <AlertDialogPrimitive.Title className="text-lg font-semibold text-black dark:text-white">
                        {title}
                    </AlertDialogPrimitive.Title>
                    <AlertDialogPrimitive.Description className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                        {description}
                    </AlertDialogPrimitive.Description>

                    <div className="mt-6 flex justify-end gap-3">
                        <AlertDialogPrimitive.Cancel
                            className="px-4 py-2 rounded-md text-sm bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-black dark:text-white"
                        >
                            {cancelText}
                        </AlertDialogPrimitive.Cancel>
                        <AlertDialogPrimitive.Action
                            onClick={onConfirm}
                            className={clsx(
                                "px-4 py-2 rounded-md text-sm text-white",
                                btnColor
                            )}
                        >
                            {confirmText}
                        </AlertDialogPrimitive.Action>
                    </div>
                </AlertDialogPrimitive.Content>
            </AlertDialogPrimitive.Portal>
        </AlertDialogPrimitive.Root>
    );
};