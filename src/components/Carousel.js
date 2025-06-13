import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"

const aspectRatioClassMap = {
    "16/9": "aspect-[16/9]",
    "3/1": "aspect-[3/1]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square"
};

export const Carousel = ({ items = [], interval = 5000, aspectRatio = "16/9" }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const aspectClass = aspectRatioClassMap[aspectRatio] || "aspect-[16/9]";

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, interval);
        return () => clearInterval(timer);
    }, [items.length, interval]);

    const goToPrev = () => {
        setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % items.length);
    };

    return (
        <div className={`relative w-full ${aspectClass} overflow-hidden rounded-xl`}>
        {items.map((item, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                        index === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white max-w-2xl">
                            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                            <p className="text-lg">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:bg-white/80 transition"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:bg-white/80 transition"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}; 