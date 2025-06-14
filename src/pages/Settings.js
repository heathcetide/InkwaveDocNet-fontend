import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Tabs } from "@/components/Tabs";
import { Input } from "@/components/Input";
import { PasswordStrengthMeter } from "@/components/PasswordStrengthMeter";
import { AlertDialog } from "@/components/AlertDialog";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/components/NotificationCenter";
import { resetPassword, deleteAccount } from "@/api/user";
import {
    Lock, Shield, User, Trash2
} from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/Tabs";

const SettingsPage = () => {
    const { user, logout } = useAuth();
    const { addNotification } = useNotification();
    const [activeTab, setActiveTab] = useState("account");
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // 处理密码更改
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            addNotification({ title: "错误", message: "新密码和确认密码不匹配", type: "error" });
            return;
        }

        try {
            await resetPassword(user.email, passwordForm.newPassword);
            addNotification({ title: "成功", message: "密码已更新", type: "success" });
            setPasswordForm({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            addNotification({ title: "错误", message: "密码更新失败", type: "error" });
            console.error(error);
        }
    };

    // 处理账户注销
    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            logout();
            addNotification({ title: "成功", message: "账户已注销", type: "success" });
        } catch (error) {
            addNotification({ title: "错误", message: "账户注销失败", type: "error" });
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* 侧边栏 */}
                    <div>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList vertical fullWidth>
                                <TabsTrigger value="account" vertical>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        账户设置
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="security" vertical>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        安全设置
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="privacy" vertical>
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        隐私与数据
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* 主内容区 */}
                    <div>
                        {/* 账户设置 */}
                        {activeTab === "account" && (
                            <div className="space-y-6">
                                <Card title="个人信息">
                                    <div className="space-y-4">
                                        <Input
                                            label="用户名"
                                            value={user.username}
                                            disabled
                                        />
                                        <Input
                                            label="邮箱"
                                            value={user.email}
                                            disabled
                                        />
                                    </div>
                                </Card>
                            </div>
                        )}

                        {/* 安全设置 */}
                        {activeTab === "security" && (
                            <div className="space-y-6">
                                <Card title="更改密码">
                                    <form onSubmit={handlePasswordChange} className="space-y-4">
                                        <Input
                                            type="password"
                                            label="当前密码"
                                            value={passwordForm.oldPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                            required
                                        />
                                        <Input
                                            type="password"
                                            label="新密码"
                                            value={passwordForm.newPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                            required
                                        />
                                        <PasswordStrengthMeter password={passwordForm.newPassword} />
                                        <Input
                                            type="password"
                                            label="确认新密码"
                                            value={passwordForm.confirmPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                            required
                                        />
                                        <Button type="submit" className="w-full">
                                            更改密码
                                        </Button>
                                    </form>
                                </Card>
                            </div>
                        )}

                        {/* 隐私与数据 */}
                        {activeTab === "privacy" && (
                            <div className="space-y-6">
                                <Card title="账户管理">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                            <div>
                                                <div className="font-medium text-red-600 dark:text-red-400">删除账户</div>
                                                <div className="text-sm text-red-500 dark:text-red-300">此操作不可逆</div>
                                            </div>
                                            {/* 删除账户确认对话框 */}
                                            <AlertDialog
                                                trigger={
                                                    <Button
                                                        variant="danger"
                                                        icon={<Trash2 className="w-4 h-4" />}
                                                    >
                                                        永久删除
                                                    </Button>
                                                }
                                                title="确认删除账户"
                                                description="此操作将永久删除您的账户和所有数据，且无法恢复。请谨慎操作。"
                                                confirmText="确认删除"
                                                cancelText="取消"
                                                onConfirm={handleDeleteAccount}
                                                color="red"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;