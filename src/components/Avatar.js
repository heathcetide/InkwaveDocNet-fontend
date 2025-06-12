import React, { useState, useMemo } from "react";
import { clsx } from "clsx";

export const Avatar = ({
                           src,
                           alt = "用户",
                           size = "md", // sm | md | lg | xl
                           shape = "circle", // circle | rounded | square
                           fallback,
                           className = "",
                           ring = false,
                           color = "cyan",
                       }) => {
    const [imageError, setImageError] = useState(false);

    const sizeMap = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-14 h-14 text-base",
        xl: "w-20 h-20 text-lg",
    };

    const shapeMap = {
        circle: "rounded-full",
        rounded: "rounded-xl",
        square: "rounded-none",
    };

    const ringColor = `ring-2 ring-${color}-400`;

    const gradients = [
        "from-cyan-500 via-blue-500 to-purple-500",
        "from-pink-500 via-red-500 to-yellow-500",
        "from-green-400 via-emerald-500 to-lime-500",
        "from-violet-500 via-indigo-500 to-sky-500",
        "from-orange-500 via-amber-500 to-yellow-400",
    ];

    const computedGradient = useMemo(() => {
        const name = alt || "?";
        const charCodeSum = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const index = charCodeSum % gradients.length;
        return gradients[index];
    }, [alt]);

    const renderFallbackText = () => {
        if (fallback) return fallback;
        const name = alt || "?";
        const text = name.slice(-2).toUpperCase();
        return (
            <span className="tracking-wide font-bold text-white">
        {text}
      </span>
        );
    };

    return (
        <div
            className={clsx(
                "relative overflow-hidden text-white",
                `bg-gradient-to-br ${computedGradient}`,
                sizeMap[size],
                shapeMap[shape],
                ring && ringColor,
                "flex items-center justify-center select-none",
                "shadow-md transition-all duration-300",
                className
            )}
        >
            {!imageError && src ? (
                <img
                    src={src}
                    alt={alt}
                    className="object-cover w-full h-full"
                    onError={() => setImageError(true)}
                />
            ) : (
                renderFallbackText()
            )}
        </div>
    );
};