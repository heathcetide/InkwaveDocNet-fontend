import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import clsx from "clsx";

/** 通用模态框（Radix Dialog + Tailwind） */
export const Modal = ({
                          open,
                          onOpenChange,
                          title,
                          children,
                          className,
                          showClose = true,
                      }) => (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
            {/* 遮罩 */}
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />

            {/* 主体 */}
            <Dialog.Content
                className={clsx(
                    "fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl",
                    "data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out",
                    className
                )}
            >
                {title && (
                    <Dialog.Title className="mb-4 text-lg font-semibold">{title}</Dialog.Title>
                )}

                {children}

                {showClose && (
                    <Dialog.Close className="absolute right-3 top-3 rounded-full p-1 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                        <X className="h-4 w-4" />
                        <span className="sr-only">关闭</span>
                    </Dialog.Close>
                )}
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);
