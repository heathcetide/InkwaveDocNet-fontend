import React from "react";
import { Avatar } from "./Avatar";
import { clsx } from "clsx";

export const AvatarGroup = ({
                                users = [],
                                max = 3,
                                size = "md",
                                direction = "horizontal",
                                className
                            }) => {
    const visibleUsers = users.slice(0, max);
    const remaining = users.length - max;

    return (
        <div className={clsx(
            "flex",
            direction === "horizontal"
                ? "flex-row -space-x-2 hover:space-x-0 transition-spacing"
                : "flex-col space-y-2",
            className
        )}>
            {visibleUsers.map((user, index) => (
                <div
                    key={user.id || index}
                    className="relative hover:-translate-y-1 transition-transform"
                >
                    <Avatar
                        src={user.avatar}
                        size={size}
                        className="border-2 border-white dark:border-neutral-800"
                    />
                </div>
            ))}
            {remaining > 0 && (
                <div className={clsx(
                    "flex items-center justify-center",
                    "bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300",
                    "border-2 border-white dark:border-neutral-800",
                    "rounded-full font-medium",
                    size === "sm" ? "w-6 h-6 text-xs" :
                        size === "md" ? "w-8 h-8 text-sm" :
                            size === "lg" ? "w-10 h-10 text-base" : ""
                )}>
                    +{remaining}
                </div>
            )}
        </div>
    );
};