import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Tabs } from "@/components/Tabs";
import { Badge } from "@/components/Badge";
import { Checkbox } from "@/components/Checkbox";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Trash2,
  CheckCircle,
  Mail,
  AlertCircle,
  Info,
} from "lucide-react";
import clsx from "clsx";
import { Footer } from "@/components/Footer";
import { useNotification } from "@/components/NotificationCenter";
import {
  getMyNotifications,
  markAsRead,
  deleteNotification,
  markAllAsRead,
} from "@/api/notification";

const NotificationsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const { addNotification } = useNotification();
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await getMyNotifications({ page: 1, size: 100 });
      setNotifications(res.records || []);
    } catch (err) {
      console.error("获取通知失败", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSelectNotification = (id) => {
    setSelectedNotifications((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

// 接收的是布尔值（true/false）
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await Promise.all(selectedNotifications.map((id) => markAsRead(id)));
      setSelectedNotifications([]);
      fetchNotifications();
    } catch (err) {
      console.error("标记为已读失败", err);
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedNotifications.map((id) => deleteNotification(id)));
      setSelectedNotifications([]);
      addNotification({ title: "成功", message: "标记为已读", type: "success" });
      fetchNotifications();
    } catch (err) {
      console.error("删除通知失败", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      addNotification({ title: "成功", message: "已全部标记为已读", type: "success" });
      fetchNotifications();
    } catch (err) {
      console.error("全部标记为已读失败", err);
      addNotification({ title: "错误", message: "操作失败", type: "error" });
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.read;
    return true;
  });

  const notificationIcons = {
    INFO: <Info className="w-5 h-5 text-blue-500" />,
    WARNING: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    ERROR: <AlertCircle className="w-5 h-5 text-red-500" />,
    MESSAGE: <Mail className="w-5 h-5 text-purple-500" />,
  };

  const navLinks = [
    { label: "首页", href: "/" },
    { label: "文档库", href: "/library" },
    { label: "模板中心", href: "/templates" },
  ];

  const userProfile = user
      ? {
        name: user.username,
        avatarUrl: user.avatarUrl || "default",
        menu: [
          { label: "个人中心", href: "/profile" },
          { label: "设置", href: "/settings" },
        ],
      }
      : null;

  return (
      <div className="min-h-screen flex flex-col">
        <Navbar
            logo="墨协"
            logoIcon={<img src="/logo192.png" alt="logo" className="w-7 h-7" />}
            links={navLinks}
            user={userProfile}
            onLogin={() => navigate("/login")}
            onLogout={() => navigate("/login")}
            themeColor="primary"
            onNotificationClick={() => navigate("/notifications")}
        />

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Bell className="w-6 h-6" /> 通知中心
              </h1>
              <div className="flex gap-2">
                <Button
                    variant="ghost"
                    onClick={handleMarkAsRead}
                    disabled={selectedNotifications.length === 0}
                    icon={<CheckCircle className="w-4 h-4" />}
                >
                  标记为已读
                </Button>
                <Button
                    variant="outline"
                    onClick={handleMarkAllAsRead}
                    icon={<CheckCircle className="w-4 h-4" />}
                >
                  全部设为已读
                </Button>
                <Button
                    variant="danger"
                    onClick={handleDelete}
                    disabled={selectedNotifications.length === 0}
                    icon={<Trash2 className="w-4 h-4" />}
                >
                  删除
                </Button>
              </div>
            </div>

            <Tabs
                value={activeTab}
                onChange={setActiveTab}
                items={[
                  { value: "all", label: "全部" },
                  { value: "unread", label: "未读" },
                ]}
            />

            <Card className="mt-4">
              <div className="divide-y">
                <div className="p-4 flex items-center gap-4 border-b">
                  <Checkbox
                      checked={
                          selectedNotifications.length > 0 &&
                          selectedNotifications.length === filteredNotifications.length
                      }
                      onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-gray-500">全选</span>
                </div>

                {filteredNotifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">暂无通知</div>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={clsx(
                                "p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors",
                                notification.read && "opacity-75"
                            )}
                        >
                          <Checkbox
                              checked={selectedNotifications.includes(notification.id)}
                              onCheckedChange={() => handleSelectNotification(notification.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {notificationIcons[notification.type] || <Info className="w-5 h-5" />}
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                  <Badge variant="blue" size="sm">
                                    未读
                                  </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.content}
                            </p>
                            <div className="text-xs text-gray-400 mt-2">
                              {new Date(notification.sendTime).toLocaleString()}
                            </div>
                          </div>
                        </div>
                    ))
                )}
              </div>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
  );
};

export default NotificationsPage;
