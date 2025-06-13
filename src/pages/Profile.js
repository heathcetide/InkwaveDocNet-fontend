import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { 
  User, Bell, Palette, Shield, CreditCard, Database, Globe, Trash2, CheckCircle, Wallet
} from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Tabs } from "@/components/Tabs";
import { Switch } from "@/components/Switch";
import { useAuth } from "@/context/AuthContext";
import { ProgressBar } from "@/components/ProgressBar";
import {Textarea} from "@headlessui/react";

const ProfilePage = () => {
  // const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [themeDark, setThemeDark] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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

  const user = {
    name: "张三",
    avatarUrl: "default",
    menu: [
      { label: "个人中心", href: "/profile" },
      { label: "设置", href: "/settings" },
    ],
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
          user={user}
          onLogin={() => console.log("登录")}
          onLogout={() => console.log("退出登录")}
          themeColor="primary"
      />
      
      <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 个人信息头部 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar 
              src={user?.avatarUrl || "https://via.placeholder.com/150"} 
              size="xl"
              editable
              onUpload={(url) => console.log("上传头像:", url)}
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{user?.name || "用户"}</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.bio || "点击编辑个人简介..."}
              </p>
              <div className="flex gap-4">
                <Button size="sm" variant="outline">编辑资料</Button>
                <Button size="sm" variant="outline">分享个人主页</Button>
              </div>
            </div>
          </div>

          {/* 导航标签 */}
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            items={[
              { value: "account", label: "账户设置", icon: <User className="w-4 h-4" /> },
              { value: "security", label: "安全中心", icon: <Shield className="w-4 h-4" /> },
              { value: "billing", label: "订阅计划", icon: <CreditCard className="w-4 h-4" /> },
              { value: "storage", label: "存储管理", icon: <Database className="w-4 h-4" /> },
            ]}
            fullWidth
          />

          {/* 账户设置 */}
          {activeTab === "account" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="基本信息" className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">用户名</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">电子邮箱</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-neutral-700"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">个人简介</label>
                    <Textarea
                      defaultValue={user?.bio}
                         className="w-full p-2 border rounded-lg h-32"
                         maxLength={200}
                         showCount
                         placeholder="请输入个人简介（最多200字）"
                    />
                  </div>
                </div>
              </Card>

              <Card title="偏好设置" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      <span>暗色模式</span>
                    </div>
                    <Switch 
                      checked={themeDark} 
                      onChange={setThemeDark}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      <span>邮件通知</span>
                    </div>
                    <Switch 
                      checked={notificationsEnabled} 
                      onChange={setNotificationsEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      <span>语言设置</span>
                    </div>
                    <select 
                      className="p-2 border rounded-lg bg-white dark:bg-neutral-800"
                      defaultValue="zh-CN"
                    >
                      <option value="zh-CN">简体中文</option>
                      <option value="en-US">English</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 安全中心 */}
          {activeTab === "security" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="账户安全" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">登录密码</div>
                      <div className="text-sm text-gray-500">上次修改：3个月前</div>
                    </div>
                    <Button variant="outline" size="sm">
                      修改密码
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">双重认证</div>
                      <div className="text-sm text-gray-500">增强账户安全性</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">登录设备管理</div>
                      <div className="text-sm text-gray-500">2 台已授权设备</div>
                    </div>
                    <Button variant="outline" size="sm">
                      管理设备
                    </Button>
                  </div>
                </div>
              </Card>

              <Card title="安全日志" className="p-6">
                <div className="space-y-4">
                  {stats.activity.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2">
                      <div>
                        <div className="font-medium">{item.action}</div>
                        <div className="text-sm text-gray-500">{item.title}</div>
                      </div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* 订阅计划 */}
          {activeTab === "billing" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="当前计划" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold">专业版</div>
                      <div className="text-sm text-gray-500">有效期至 2024-12-31</div>
                    </div>
                    <div className="text-2xl font-bold">¥49/月</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>无限文档数量</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>高级模板库</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>团队协作功能</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary">升级计划</Button>
                    <Button variant="dangerOutline">取消订阅</Button>
                  </div>
                </div>
              </Card>

              <Card title="支付方式" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <span>**** **** **** 1234</span>
                    </div>
                    <Button variant="outline" size="sm">
                      更换卡片
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-5 h-5" />
                      <span>支付宝账户</span>
                    </div>
                    <Button variant="outline" size="sm">
                      管理账户
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* 存储管理 */}
          {activeTab === "storage" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="存储概览" className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>已用空间</span>
                      <span>{stats.storage.used}GB / {stats.storage.total}GB</span>
                    </div>
                    <ProgressBar 
                      value={(stats.storage.used / stats.storage.total) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{stats.storage.files}</div>
                      <div className="text-sm text-gray-500">文档数量</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">23</div>
                      <div className="text-sm text-gray-500">图片文件</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">5.2GB</div>
                      <div className="text-sm text-gray-500">其他文件</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="数据管理" className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">自动备份</div>
                      <div className="text-sm text-gray-500">每日凌晨3点自动备份</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">数据导出</div>
                      <div className="text-sm text-gray-500">导出所有文档数据</div>
                    </div>
                    <Button variant="outline" size="sm">
                      立即导出
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 dark:bg-red-900/20">
                    <div>
                      <div className="font-medium text-red-600 dark:text-red-400">删除账户</div>
                      <div className="text-sm text-red-500 dark:text-red-300">此操作不可逆</div>
                    </div>
                    <Button variant="danger" size="sm" icon={<Trash2 className="w-4 h-4" />}>
                      删除账户
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage; 