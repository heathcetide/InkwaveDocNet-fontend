import React, {useState} from "react";
import {Menu, X, LogIn} from "lucide-react";
import {clsx} from "clsx";
import {useAuth} from '@/context/AuthContext';
import defaultAvatar from '@/assets/default-avatar.png';
import {useNavigate} from "react-router-dom";
import {Bell} from "lucide-react";
import { useNotificationContext } from "@/context/NotificationContext";
export const Navbar = ({
                           logo = "Logo",
                           logoIcon = null, // ReactNode or image
                           links = [], // [{ label, href }]
                           user = null, // { name, avatarUrl, menu: [{ label, href }] }
                           onLogin = () => {
                           },
                           onLogout = () => {
                           },
                           themeColor = "primary", // 控制主题色类名前缀
                           className = "",
                           onNotificationClick,
                       }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {logout} = useAuth();
    const navigate = useNavigate();
    const { unreadCount } = useNotificationContext();

    return (
        <nav className={clsx("w-full bg-white dark:bg-neutral-900 shadow z-40", className)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        {logoIcon || (
                            <svg
                                className="w-7 h-7 text-primary-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M12 2L3 21h18L12 2zm0 4l6.5 11h-13L12 6z"/>
                            </svg>
                        )}
                        <span className="text-xl font-bold text-primary-800 dark:text-primary-200">
                            {logo}
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6 items-center">
                        {links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-medium transition",
                                    "text-neutral-700 dark:text-neutral-200",
                                    `hover:text-${themeColor}-500 dark:hover:text-${themeColor}-400`
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                {user && onNotificationClick && (
                                    <button
                                        onClick={onNotificationClick}
                                        className="relative text-neutral-700 dark:text-neutral-200 hover:text-primary-500 dark:hover:text-primary-400"
                                        title="查看通知"
                                    >
                                        <Bell className="w-5 h-5" />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                                        )}
                                    </button>
                                )}

                                {/* 👤 用户头像和菜单 */}
                                <div className="relative">
                                    <button
                                        onClick={() => setMenuOpen(!menuOpen)}
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={user.avatarUrl === 'default' ? defaultAvatar : user.avatarUrl}
                                            alt={user.name}
                                            className="w-8 h-8 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
                                        />
                                        <span className="text-sm text-neutral-700 dark:text-neutral-200">
            {user.name}
          </span>
                                    </button>

                                    {menuOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow-lg py-2 z-50">
                                            {(user.menu || []).map((item, idx) => (
                                                <a
                                                    key={idx}
                                                    href={item.href}
                                                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                >
                                                    {item.label}
                                                </a>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    navigate("/login");
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            >
                                                退出登录
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            onLogin && (
                                <button
                                    onClick={onLogin}
                                    className={clsx(
                                        "flex items-center gap-2 text-sm font-medium transition",
                                        "text-neutral-700 dark:text-neutral-200",
                                        `hover:text-${themeColor}-500 dark:hover:text-${themeColor}-400`
                                    )}
                                >
                                    <LogIn className="w-4 h-4"/> 登录
                                </button>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-neutral-700 dark:text-neutral-200"
                    >
                        {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    {links.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.href}
                            className={clsx(
                                "block py-2 text-sm transition",
                                "text-neutral-700 dark:text-neutral-200",
                                `hover:text-${themeColor}-500 dark:hover:text-${themeColor}-400`
                            )}
                        >
                            {link.label}
                        </a>
                    ))}

                    {user ? (
                        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 space-y-1">
                            <div className="flex items-center gap-2 py-2">
                                <img
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="text-sm text-neutral-700 dark:text-neutral-200">{user.name}</span>
                            </div>
                            {(user.menu || []).map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    className="block w-full text-left px-2 py-1 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button
                                onClick={() => logout()}
                                className="block w-full text-left px-2 py-1 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                            >
                                退出登录
                            </button>
                        </div>
                    ) : (
                        onLogin && (
                            <button
                                onClick={onLogin}
                                className={clsx(
                                    "flex items-center gap-2 text-sm font-medium transition",
                                    "text-neutral-700 dark:text-neutral-200",
                                    `hover:text-${themeColor}-500 dark:hover:text-${themeColor}-400`
                                )}
                            >
                                <LogIn className="w-4 h-4"/> 登录
                            </button>
                        )
                    )}
                </div>
            )}
        </nav>
    );
};
