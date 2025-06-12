import React from "react";
import { clsx } from "clsx";

export const DataTable = ({
                              columns = [],
                              data = [],
                              loading = false,
                              striped = true,
                              hover = true,
                              emptyText = "暂无数据",
                              className = "",
                          }) => {
    return (
        <div className="overflow-auto rounded-xl border border-neutral-200 dark:border-neutral-700">
            <table className={clsx("min-w-full text-sm text-left", className)}>
                <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="px-4 py-3 font-semibold whitespace-nowrap">
                            {col.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                        <td colSpan={columns.length} className="px-4 py-4 text-center text-neutral-400">
                            加载中...
                        </td>
                    </tr>
                ) : data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="px-4 py-4 text-center text-neutral-400">
                            {emptyText}
                        </td>
                    </tr>
                ) : (
                    data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={clsx(
                                striped && rowIndex % 2 === 1 && "bg-neutral-50 dark:bg-neutral-800/50",
                                hover && "hover:bg-neutral-100 dark:hover:bg-neutral-700/40"
                            )}
                        >
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-4 py-3 whitespace-nowrap">
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};
