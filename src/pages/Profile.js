import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Edit, Save } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Switch } from "@/components/Switch";
import { useAuth } from "@/context/AuthContext";
import { ProgressBar } from "@/components/ProgressBar";
import { Textarea } from "@/components/Textarea";
import { Input } from "@/components/Input";
import { updateUserInfo, uploadAvatar, updateUserPreferences } from "@/api/user";
import { useNotification } from "@/components/NotificationCenter";

const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  const { addNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: user.username,
    avatarUrl: user.avatarUrl || "default",
    email: user.email || "private@mouxie.com",
    bio: user.bio || "",
    themeDark: user.themeDark || false,
    emailNotifications: user.emailNotifications || true,
    language: user.language || "zh-CN",
  });
  const [themeDark, setThemeDark] = useState(userProfile.themeDark);
  const [notificationsEnabled, setNotificationsEnabled] = useState(userProfile.emailNotifications);
  const navigate = useNavigate();

  // 模拟数据
  const stats = {
    storage: {
      used: 15.8, // GB
      total: 50,
      files: 142,
    },
    activity: [
      { date: "2024-03-15", action: "创建文档", title: "项目计划书" },
      { date: "2024-03-14", action: "更新文档", title: "需求文档" },
    ],
    devices: [
      { id: 1, name: "MacBook Pro", location: "北京", lastActive: "2小时前" },
      { id: 2, name: "iPhone 15", location: "上海", lastActive: "5小时前" },
    ],
  };

  // 处理头像上传
  const handleAvatarUpload = async (file) => {
    try {
      setIsLoading(true);
      const newAvatarUrl = await uploadAvatar(file);
      setUserProfile({ ...userProfile, avatarUrl: newAvatarUrl });
      addNotification({ title: "成功", message: "头像上传成功", type: "success" });
      await refreshUser();
    } catch (error) {
      addNotification({ title: "错误", message: error.message || "头像上传失败", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // 处理保存用户信息
  const handleSaveProfile = async () => {
    if (!userProfile.username || !userProfile.email) {
      addNotification({ title: "错误", message: "用户名和邮箱不能为空", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const token = await updateUserInfo(userProfile);
      localStorage.setItem("token", token);
      addNotification({ title: "成功", message: "用户信息更新成功", type: "success" });
      setIsEditing(false);
      await refreshUser()
    } catch (error) {
      addNotification({ title: "错误", message: error.message || "更新用户信息失败", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      await updateUserPreferences({
        themeDark,
        emailNotifications: notificationsEnabled,
      });
      addNotification({ title: "成功", message: "偏好设置已保存", type: "success" });
      await refreshUser(); // 如果你希望立即反映更新
    } catch (error) {
      addNotification({ title: "错误", message: error.message || "偏好设置保存失败", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // 导航栏链接
  const navLinks = [
    { label: "首页", href: "/" },
    { label: "文档库", href: "/library" },
    { label: "模板中心", href: "/templates" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <Navbar
          logo="墨协"
          logoIcon={<img src="/logo192.png" alt="logo" className="w-7 h-7" />}
          links={navLinks}
          user={{
            ...userProfile,
            menu: [
              { label: "个人中心", href: "/profile" },
              { label: "设置", href: "/settings" },
            ],
          }}
          onLogin={() => console.log("登录")}
          onLogout={() => console.log("退出登录")}
          themeColor="primary"
          onNotificationClick={() => navigate("/notifications")}
      />
      <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 个人信息头部 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Avatar
                  src={userProfile.avatarUrl}
                  size="xl"
                  className="mb-4"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleAvatarUpload(file);
                        }
                      }}
                    />
                    <Edit className="w-5 h-5" />
                  </label>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userProfile.username}</h1>
                <p className="text-gray-500">{userProfile.email}</p>
              </div>
            </div>
            <Button
              onClick={() => {
                if (isEditing) {
                  handleSaveProfile();
                } else {
                  setIsEditing(true);
                }
              }}
              icon={isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              loading={isLoading}
            >
              {isEditing ? "保存资料" : "编辑资料"}
            </Button>
          </div>

          {/* 编辑资料部分 */}
          {isEditing && (
            <Card className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">用户名</label>
                  <Input
                    value={userProfile.username}
                    onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">邮箱</label>
                  <Input
                    disabled
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">个人简介</label>
                <Textarea
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                  rows={3}
                />
              </div>
            </Card>
          )}

          {/* 个人主页分析 */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">个人主页分析</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">存储空间</h3>
                <ProgressBar
                  value={(stats.storage.used / stats.storage.total) * 100}
                  label={`${stats.storage.used}GB / ${stats.storage.total}GB`}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">文档数量</h3>
                <div className="text-2xl font-bold">{stats.storage.files}</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">最近活动</h3>
                <div className="space-y-1">
                  {stats.activity.slice(0, 2).map((act, i) => (
                    <div key={i} className="text-sm">
                      {act.date} {act.action}：{act.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* 其他设置部分 */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">设置</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">深色模式</h3>
                  <p className="text-sm text-gray-500">启用深色主题</p>
                </div>
                <Switch
                  checked={themeDark}
                  onChange={(checked) => setThemeDark(checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">邮件通知</h3>
                  <p className="text-sm text-gray-500">接收重要通知邮件</p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onChange={(checked) => setNotificationsEnabled(checked)}
                />
              </div>
              <Button
                  onClick={handleSavePreferences}
                  loading={isLoading}
                  className="mt-4 bg-primary-600 hover:bg-primary-700 text-white"
              >
                保存偏好设置
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage; 