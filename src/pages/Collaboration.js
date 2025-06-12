import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar} from "../components/Navbar";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { DataTable } from "../components/DataTable";
import { Select } from "../components/Select";
import { PermissionBadge } from "../components/PermissionBadge";
import { useDocument } from "../hooks/useDocument";
import { Users, Link, Trash } from "lucide-react";
import { Badge } from "../components/Badge"
const CollaborationPage = () => {
  const { docId } = useParams();
  const { document, isLoading, error } = useDocument(docId);
  const [members, setMembers] = useState([
    // 示例数据
    {
      id: 1,
      name: "张三",
      role: "owner",
      permissions: ["edit", "comment", "view"],
      avatar: "https://i.pravatar.cc/150?img=1"
    }
  ]);
  const [inviteSettings, setInviteSettings] = useState({
    role: "comment",
    expires: "7d"
  });

  const updatePermissions = (memberId, newPermissions) => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, permissions: newPermissions } : m
    ));
  };

  if (isLoading) return <div>加载文档信息...</div>;
  if (error) return <div>加载失败：{error.message}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar themeColor="primary" />
      
      <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6" /> {document?.title} 的协同管理
          </h1>

          {/* 成员列表 */}
          <Card>
            <DataTable
              columns={[
                { header: "成员", accessor: "name" },
                { header: "权限", accessor: "permissions" },
                { header: "操作", accessor: "actions" }
              ]}
              data={members.map(member => ({
                name: (
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} className="w-8 h-8 rounded-full" />
                    <span>{member.name}</span>
                    {member.role === "owner" && 
                      <Badge variant="purple">所有者</Badge>}
                  </div>
                ),
                permissions: (
                  <div className="flex gap-2">
                    {member.permissions.map(p => (
                      <PermissionBadge key={p} type={p} />
                    ))}
                  </div>
                ),
                actions: member.role !== "owner" && (
                  <div className="flex gap-2">
                    <Button variant="dangerOutline" size="sm">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                )
              }))}
            />
          </Card>

          {/* 邀请新成员 */}
          <Card title="邀请新成员">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="权限类型"
                options={[
                  { value: "edit", label: "可编辑" },
                  { value: "comment", label: "可评论" },
                  { value: "view", label: "仅查看" }
                ]}
                value={inviteSettings.role}
                onChange={v => setInviteSettings(p => ({ ...p, role: v }))}
              />
              <Select
                label="有效期"
                options={[
                  { value: "1h", label: "1小时" },
                  { value: "1d", label: "1天" },
                  { value: "7d", label: "7天" }
                ]}
                value={inviteSettings.expires}
                onChange={v => setInviteSettings(p => ({ ...p, expires: v }))}
              />
              <div className="flex items-end">
                <Button className="w-full" icon={<Link className="w-4 h-4" />}>
                  生成链接
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CollaborationPage; 