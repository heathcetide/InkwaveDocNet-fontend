import React, { useState } from "react";
import { Navbar} from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Tabs } from "@/components/Tabs";
import { Switch } from "@/components/Switch";
import { Badge } from "@/components/Badge";

import { TeamCard } from "@/components/TeamCard";
import { Users, Plus, Settings, Lock, Folder, Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const TeamPage = () => {
  // const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("myTeams");
  const [teams] = useState([
    {
      id: 1,
      name: "产品研发部",
      role: "管理员",
      members: [
        { id: 1, name: "张三", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "李四", avatar: "https://i.pravatar.cc/150?img=2" }
      ],
      documents: 15
    }
  ]);

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
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-6 h-6" /> 团队管理
            </h1>
            <Button icon={<Plus className="w-4 h-4" />}>新建团队</Button>
          </div>

          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            items={[
              { value: "myTeams", label: "我的团队" },
              { value: "joined", label: "已加入团队" }
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>

          {/* 团队详情（示例） */}
          {teams[0] && (
            <Card title="产品研发部 管理面板">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 成员管理 */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Users className="w-5 h-5" /> 成员管理
                  </h3>
                  <div className="space-y-2">
                    {teams[0].members.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <img 
                            src={member.avatar} 
                            className="w-6 h-6 rounded-full" 
                           alt={"avatar"}/>
                          <span>{member.name}</span>
                        </div>
                        <Select
                          size="sm"
                          value="member"
                          options={[
                            { value: "admin", label: "管理员" },
                            { value: "editor", label: "编辑者" },
                            { value: "viewer", label: "查看者" }
                          ]}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 文档权限 */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Folder className="w-5 h-5" /> 文档权限
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2">
                      <span>默认文档权限</span>
                      <Badge variant="blue">可编辑</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span>敏感文档权限</span>
                      <Badge variant="red">仅查看</Badge>
                    </div>
                  </div>
                </div>

                {/* 团队设置 */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Settings className="w-5 h-5" /> 团队设置
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2">
                      <span>团队可见性</span>
                      <Badge variant="purple">私有团队</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span>两步验证</span>
                      <Switch />
                    </div>
                    <div className="pt-4">
                      <Button variant="dangerOutline" className="w-full">
                        <Trash className="w-4 h-4" /> 解散团队
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeamPage; 