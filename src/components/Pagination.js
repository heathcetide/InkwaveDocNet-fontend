import React from "react";
import { clsx } from "clsx";

export const Pagination = ({
                               currentPage = 1,
                               totalPages = 1,
                               onPageChange = () => {},
                               maxButtons = 5,
                               className = "",
                           }) => {
    const getPages = () => {
        const pages = [];
        const half = Math.floor(maxButtons / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + maxButtons - 1);

        if (end - start < maxButtons - 1) {
            start = Math.max(1, end - maxButtons + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className={clsx("flex justify-center items-center gap-1 mt-4", className)}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={clsx(
                    "px-3 py-1 rounded text-sm",
                    currentPage === 1
                        ? "text-neutral-400 cursor-not-allowed"
                        : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
                )}
            >
                上一页
            </button>

            {getPages().map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={clsx(
                        "px-3 py-1 rounded text-sm font-medium",
                        page === currentPage
                            ? "bg-cyan-500 text-white shadow"
                            : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    )}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={clsx(
                    "px-3 py-1 rounded text-sm",
                    currentPage === totalPages
                        ? "text-neutral-400 cursor-not-allowed"
                        : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
                )}
            >
                下一页
            </button>
        </div>
    );
};
