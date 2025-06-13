import React, { useState } from "react";
import { Navbar} from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Tabs } from "@/components/Tabs";
import { Switch } from "@/components/Switch";
import { Input } from "@/components/Input";
import {
    Lock, Palette, Shield, User, Settings
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PasswordStrengthMeter } from "@/components/PasswordStrengthMeter";

const SettingsPage = () => {
    // const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("account");
    const [settings, setSettings] = useState({
        theme: "system",
        notifications: {
            email: true,
            push: true,
            weeklyReport: false
        },
        security: {
            twoFactor: false,
            passwordAge: 90
        },
        language: "zh-CN"
    });

    const user = {
        name: "张三",
        avatarUrl: "default",
        menu: [
            {label: "个人中心", href: "/profile"},
            {label: "设置", href: "/settings"},
        ],
    };

    // 导航栏链接
    const navLinks = [
        {label: "首页", href: "/"},
        {label: "文档库", href: "/library"},
        {label: "模板中心", href: "/templates"},
    ];


    return (
        <div className="min-h-screen flex flex-col">
            {/* 顶部导航栏 */}
            <Navbar
                logo="墨协"
                logoIcon={<img src="/logo192.png" alt="logo" className="w-7 h-7" />}
                links={navLinks}
                user={user}
                onLogin={() => console.log("登录")}
                onLogout={() => console.log("退出登录")}
                themeColor="primary"
            />
            <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-900">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Settings className="w-6 h-6" /> 系统设置
                    </h1>

                    <Tabs
                        value={activeTab}
                        onChange={setActiveTab}
                        items={[
                            { value: "account", label: "账户设置", icon: <User className="w-4 h-4" /> },
                            { value: "security", label: "安全设置", icon: <Lock className="w-4 h-4" /> },
                            { value: "preferences", label: "偏好设置", icon: <Palette className="w-4 h-4" /> },
                            { value: "privacy", label: "隐私与数据", icon: <Shield className="w-4 h-4" /> }
                        ]}
                        fullWidth
                    />

                    {/* 账户设置 */}
                    {activeTab === "account" && (
                        <div className="space-y-6">
                            <Card title="基本信息">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="用户名" defaultValue={user?.name} />
                                    <Input label="电子邮箱" defaultValue={user?.email} disabled />
                                </div>
                            </Card>

                            <Card title="密码设置">
                                <div className="space-y-4">
                                    <Input label="当前密码" type="password" />
                                    <Input label="新密码" type="password" />
                                    <PasswordStrengthMeter password="newPassword" />
                                    <div className="flex justify-end">
                                        <Button>更新密码</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* 安全设置 */}
                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <Card title="双重认证">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <div className="space-y-1">
                                        <div className="font-medium">两步验证</div>
                                        <div className="text-sm text-gray-500">
                                            {settings.security.twoFactor ? "已启用" : "已禁用"}
                                        </div>
                                    </div>
                                    <Switch
                                        checked={settings.security.twoFactor}
                                        onChange={checked => setSettings(s => ({
                                            ...s,
                                            security: { ...s.security, twoFactor: checked }
                                        }))}
                                    />
                                </div>
                            </Card>

                            <Card title="会话安全">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <div className="font-medium">自动登出时间</div>
                                            <div className="text-sm text-gray-500">30分钟无操作后自动退出</div>
                                        </div>
                                        <Select
                                            options={[
                                                { value: 15, label: "15分钟" },
                                                { value: 30, label: "30分钟" },
                                                { value: 60, label: "1小时" }
                                            ]}
                                            value={30}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* 偏好设置 */}
                    {activeTab === "preferences" && (
                        <div className="space-y-6">
                            <Card title="外观设置">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="主题模式"
                                        options={[
                                            { value: "light", label: "浅色模式" },
                                            { value: "dark", label: "深色模式" },
                                            { value: "system", label: "跟随系统" }
                                        ]}
                                        value={settings.theme}
                                        onChange={v => setSettings(s => ({ ...s, theme: v }))}
                                    />
                                    <Select
                                        label="界面语言"
                                        options={[
                                            { value: "zh-CN", label: "简体中文" },
                                            { value: "en-US", label: "English" }
                                        ]}
                                        value={settings.language}
                                        onChange={v => setSettings(s => ({ ...s, language: v }))}
                                    />
                                </div>
                            </Card>

                            <Card title="通知设置">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <div className="font-medium">邮件通知</div>
                                            <div className="text-sm text-gray-500">重要系统通知</div>
                                        </div>
                                        <Switch
                                            checked={settings.notifications.email}
                                            onChange={checked => setSettings(s => ({
                                                ...s,
                                                notifications: { ...s.notifications, email: checked }
                                            }))}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <div className="font-medium">推送通知</div>
                                            <div className="text-sm text-gray-500">实时更新提醒</div>
                                        </div>
                                        <Switch
                                            checked={settings.notifications.push}
                                            onChange={checked => setSettings(s => ({
                                                ...s,
                                                notifications: { ...s.notifications, push: checked }
                                            }))}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* 隐私与数据 */}
                    {activeTab === "privacy" && (
                        <div className="space-y-6">
                            <Card title="数据管理">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <div className="font-medium">导出数据</div>
                                            <div className="text-sm text-gray-500">导出所有个人数据</div>
                                        </div>
                                        <Button variant="outline">立即导出</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <div>
                                            <div className="font-medium text-red-600 dark:text-red-400">删除账户</div>
                                            <div className="text-sm text-red-500 dark:text-red-300">此操作不可逆</div>
                                        </div>
                                        <Button variant="danger">永久删除</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;