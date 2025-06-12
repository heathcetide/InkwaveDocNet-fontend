import React from "react";
import { clsx } from "clsx";

export const Skeleton = ({
                             width = "w-full",
                             height = "h-4",
                             rounded = "rounded-md",
                             animated = true,
                             className = "",
                         }) => {
    return (
        <div
            className={clsx(
                "bg-neutral-200 dark:bg-neutral-700",
                width,
                height,
                rounded,
                animated && "animate-pulse",
                className
            )}
        />
    );
};

export const SkeletonText = ({ lines = 3, lineHeight = "h-4", gap = "gap-2" }) => {
    return (
        <div className={clsx("flex flex-col", gap)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} height={lineHeight} />
            ))}
        </div>
    );
};

export const SkeletonAvatar = ({ size = "w-12 h-12", rounded = "rounded-full" }) => {
    return <Skeleton width={size.split(" ")[0]} height={size.split(" ")[1]} rounded={rounded} />;
};

export const SkeletonCard = () => {
    return (
        <div className="p-4 border rounded-xl space-y-3">
            <SkeletonAvatar />
            <SkeletonText lines={2} />
            <Skeleton height="h-6" width="w-1/2" />
        </div>
    );
};
