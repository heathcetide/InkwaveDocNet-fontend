import React, { createContext, useContext, useEffect, useState } from "react";
import { getUnreadCount } from "@/api/notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnread = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const count = await getUnreadCount();
            setUnreadCount(count || 0);
        } catch (e) {
            console.error("获取未读通知数量失败", e);
        }
    };

    useEffect(() => {
        fetchUnread();
        const interval = setInterval(fetchUnread, 30000); // 每 30 秒刷新
        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider value={{ unreadCount, refreshUnreadCount: fetchUnread }}>
            {children}
        </NotificationContext.Provider>
    );
};

// 自定义 Hook
export const useNotificationContext = () => useContext(NotificationContext);
