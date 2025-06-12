import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const Drawer = ({
                           open = false,
                           onClose = () => {},
                           position = "right", // 'left' | 'right'
                           width = "w-80", // Tailwind width class
                           children,
                           className = "",
                           backdrop = true,
                       }) => {
    const positionMap = {
        right: "right-0",
        left: "left-0",
    };

    const animationVariants = {
        hidden: {
            x: position === "right" ? "100%" : "-100%",
        },
        visible: {
            x: 0,
            transition: { type: "spring", stiffness: 400, damping: 30 },
        },
        exit: {
            x: position === "right" ? "100%" : "-100%",
            transition: { duration: 0.2 },
        },
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex">
                    {backdrop && (
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={onClose}
                        />
                    )}

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={animationVariants}
                        className={`fixed top-0 h-full ${positionMap[position]} ${width} bg-white dark:bg-neutral-900 shadow-xl z-50 flex flex-col ${className}`}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-700">
                            <div className="text-lg font-semibold text-neutral-800 dark:text-white">侧边栏</div>
                            <button
                                onClick={onClose}
                                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto p-4">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};