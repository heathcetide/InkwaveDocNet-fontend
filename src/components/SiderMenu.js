import React, { useState } from "react";
import { clsx } from "clsx";
import { Home, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const defaultMenu = [
    { label: "仪表盘", icon: <Home className="w-5 h-5" />, path: "/dashboard" },
    { label: "用户管理", icon: <Users className="w-5 h-5" />, path: "/users" },
    { label: "系统设置", icon: <Settings className="w-5 h-5" />, path: "/settings" },
];

export const SiderMenu = ({
                              menuItems = defaultMenu,
                              collapsedWidth = "w-16",
                              expandedWidth = "w-60",
                              themeColor = "cyan",
                          }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <aside
            className={clsx(
                "h-screen transition-all duration-300 bg-white dark:bg-neutral-900 shadow border-r border-neutral-200 dark:border-neutral-700",
                collapsed ? collapsedWidth : expandedWidth
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-700">
                {!collapsed && <span className={clsx("text-xl font-bold", `text-${themeColor}-600 dark:text-${themeColor}-400`)}>菜单面板</span>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col py-4">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={clsx(
                            "flex items-center gap-3 px-4 py-2 text-sm transition-all",
                            isActive(item.path)
                                ? `bg-${themeColor}-100 dark:bg-${themeColor}-800/40 text-${themeColor}-600 dark:text-${themeColor}-300`
                                : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        )}
                    >
                        {item.icon}
                        {!collapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>
        </aside>
    );
};
