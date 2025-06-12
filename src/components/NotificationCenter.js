import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { clsx } from "clsx";

const NotificationContext = createContext();

export const NotificationProvider = ({ children, max = 3 }) => {
    const [notifications, setNotifications] = useState([]);
    const idRef = useRef(0);

    const addNotification = (notification) => {
        setNotifications((prev) => {
            const next = [...prev, { ...notification, id: idRef.current++ }];
            return next.slice(-max);
        });
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-[320px]">
                {notifications.map((n) => (
                    <NotificationToast key={n.id} {...n} onClose={() => removeNotification(n.id)} />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);

const NotificationToast = ({ id, title, message, type = "info", duration = 4000, color, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const baseColor = {
        info: "bg-cyan-500",
        success: "bg-emerald-500",
        error: "bg-red-500",
        custom: color || "bg-neutral-700",
    }[type] || "bg-cyan-500";

    return (
        <div
            className={clsx(
                "rounded-xl px-4 py-3 text-white shadow-lg flex flex-col gap-1 animate-in fade-in slide-in-from-top",
                baseColor
            )}
        >
            <div className="flex justify-between items-center">
                <strong className="text-sm">{title}</strong>
                <button onClick={onClose} className="text-white/70 hover:text-white">
                    ✕
                </button>
            </div>
            {message && <div className="text-sm text-white/90">{message}</div>}
        </div>
    );
};