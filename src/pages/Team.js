import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { Switch } from "@/components/Switch";
import { Badge } from "@/components/Badge";
import { TeamCard } from "@/components/TeamCard";
import { Users, Plus, Settings, Lock, Folder, Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  createOrganization,
  getMyOrganizations,
  switchOrganization,
  getCurrentOrganization, updateOrganization, deleteOrganization
} from "@/api/organization";
import { useNotification } from "@/components/NotificationCenter";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Skeleton } from "@/components/Skeleton";
import {useNavigate} from "react-router-dom";

const TeamPage = () => {
  const {user, setUser} = useAuth();
  // 导航栏链接
  const navLinks = [
    {label: "首页", href: "/"},
    {label: "文档库", href: "/library"},
    {label: "模板中心", href: "/templates"},
  ];

  // 用户信息
  const userProfile = user ? {
    name: user.username,
    avatarUrl: user.avatarUrl || "default",
    menu: [
      { label: "个人中心", href: "/profile" },
      { label: "设置", href: "/settings" },
    ],
  } : null;
  const { addNotification } = useNotification();
  const [activeTab, setActiveTab] = useState("myTeams");
  const [teams, setTeams] = useState([]);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [isLoading, setIsLoading] = useState({
    teams: true,
    currentOrg: true
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [switchingOrgId, setSwitchingOrgId] = useState(null);
  const [maxMembers, setMaxMembers] = useState('');
  const [published, setPublished] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  const handleOpenDeleteModal = (team) => {
    setTeamToDelete(team);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTeamToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (teamToDelete) {
      await handleDeleteOrganization(teamToDelete.id);
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // 防止组件卸载时请求继续发送
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        if (isMounted) {
          const orgsResponse = await getMyOrganizations();
          console.log("组织列表响应:", orgsResponse);
          setTeams(orgsResponse || []);
        }

        try {
          const currentResponse = await getCurrentOrganization();
          console.log("当前请求:   ", currentResponse);
          if (isMounted) {
            setCurrentOrg(currentResponse || null);
          }
        } catch (currentError) {
          if (currentError.name !== 'AbortError') {
            // 处理非中止错误
          }
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          addNotification({ title: "数据加载失败", message: error.message, type: "error" });
        }
      } finally {
        if (isMounted) {
          setIsLoading({ teams: false, currentOrg: false });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [addNotification]); // 只依赖 addNotification，不会因为 `teams` 变化而重复请求

  // 切换当前组织
  const handleSwitchOrganization = async (orgId) => {
    try {
      setSwitchingOrgId(orgId);
      await switchOrganization(orgId);
      
      // 直接更新当前组织状态
      setCurrentOrg(prev => ({
        ...teams.find(t => t.id === orgId),
        // 保持原有数据的扩展性
        ...prev
      }));
    } catch (error) {
      addNotification({
        title: "切换失败",
        message: error.message,
        type: "error"
      });
    } finally {
      setSwitchingOrgId(null);
    }
  };

  // 打开创建团队模态框
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // 关闭创建团队模态框
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setTeamName("");
    setTeamDescription("");
  };

  // 创建新团队
  const handleCreateTeam = async () => {
    if (!teamName) {
      addNotification({ title: "错误", message: "请输入团队名称", type: "error" });
      return;
    }

    try {
      setIsLoading({ teams: true, currentOrg: false });
      const response = await createOrganization({
        name: teamName,
        description: teamDescription || "",
        maxMembers: maxMembers ? parseInt(maxMembers) : 50, // 默认50人
        published: published
      });
      if (response?.data) {
        setTeams(prev => [...prev, response.data]);
        setCurrentOrg(response.data);
      }
      addNotification({ title: "创建成功", message: `团队 ${teamName} 已创建`, type: "success" });
      closeCreateModal();
    } catch (error) {
      addNotification({ title: "创建失败", message: error.message, type: "error" });
    } finally {
      setIsLoading({ teams: false, currentOrg: false });
    }
  };

  // 删除团队
  const handleDeleteOrganization = async (orgId) => {
    try {
      await deleteOrganization(orgId);
      // 更新本地状态
      setTeams(prev => prev.filter(team => team.id !== orgId));
      if (currentOrg?.id === orgId) {
        setCurrentOrg(null);
      }
      addNotification({
        title: "解散成功",
        message: "团队已成功解散",
        type: "success"
      });
    } catch (error) {
      addNotification({
        title: "解散失败",
        message: error.response?.data?.message || error.message,
        type: "error"
      });
    }
  };

  // 更新团队信息
  const handleUpdateOrganization = async (orgId, newData) => {
    try {
      const response = await updateOrganization(orgId, newData);
      console.log(response);
        // 更新本地状态
        setTeams(prev => 
          prev.map(team => 
            team.id === orgId ? { ...team, ...response } : team
          )
        );
        if (currentOrg?.id === orgId) {
          setCurrentOrg(prev => ({ ...prev, ...response }));
        }
        addNotification({
          title: "更新成功",
          message: "团队信息已更新",
          type: "success"
        });
        setIsEditModalOpen(false);
    } catch (error) {
      addNotification({
        title: "更新失败",
        message: error.response?.data?.message || error.message,
        type: "error"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <Navbar
          logo="墨协"
          logoIcon={<img src="/logo192.png" alt="logo" className="w-7 h-7"/>}
          links={navLinks}
          user={userProfile}
          onLogin={() => navigate("/login")}
          onLogout={() => navigate("/login")}
          themeColor="primary"
          onNotificationClick={() => navigate("/notifications")}
      />
      {/* 当前组织展示 */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {isLoading.currentOrg ? (
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          ) : currentOrg ? (
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  当前组织：{currentOrg.name}
                </h2>
                {currentOrg.description && (
                  <p className="text-sm text-gray-600 mt-1">{currentOrg.description}</p>
                )}
              </div>
              <Badge variant="blue">当前使用中</Badge>
            </div>
          ) : (
            <div className="text-gray-600">
              尚未选择组织，请从下方选择一个组织设为当前
            </div>
          )}
        </div>
      </div>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">团队管理</h1>
            <Button
              onClick={openCreateModal}
              icon={<Plus className="w-4 h-4" />}
              loading={isLoading.teams}
            >
              新建团队
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="myTeams">我的团队</TabsTrigger>
              <TabsTrigger value="joinedTeams">已加入团队</TabsTrigger>
            </TabsList>
            <TabsContent value="myTeams">
              {teams.length === 0 && !isLoading.teams && (
                <div className="col-span-full text-center py-12">
                  <Users className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-4 text-gray-500">
                    {currentOrg ? "您尚未创建任何组织" : "请先创建或选择一个组织"}
                  </p>
                  <Button 
                    onClick={openCreateModal}
                    className="mt-4"
                    variant="primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {currentOrg ? "新建组织" : "创建第一个组织"}
                  </Button>
                </div>
              )}
              {teams.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teams.map((team) => {
                    return (
                      <Card key={team.id} className="p-4 relative">
                        {/* 当前组织标识 */}
                        {currentOrg?.id === team.id && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="cyan">当前组织</Badge>
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <img
                            src={team.ownerAvatar}
                            alt={team.ownerUsername}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h3 className="text-lg font-semibold">{team.name}</h3>
                            <p className="text-sm text-gray-500">{team.ownerUsername}</p>
                          </div>
                        </div>
                        {team.description && (
                          <p className="text-sm text-gray-500 mt-2">{team.description}</p>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                          <Badge variant="green">成员：{team.members || 0}</Badge>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={currentOrg?.id === team.id ? "primary" : "outline"}
                              loading={switchingOrgId === team.id}
                              onClick={() => handleSwitchOrganization(team.id)}
                            >
                              {currentOrg?.id === team.id ? "当前使用中" : "设为当前"}
                            </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setEditingTeam(team);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                编辑
                              </Button>
                          </div>
                        </div>
                        {/* Rest of your code */}
                        <Button
                            variant="dangerOutline"
                            onClick={() => handleOpenDeleteModal(team)}
                        >
                          <Trash className="w-4 h-4 mr-2" /> 解散团队
                        </Button>

                        {/* Delete confirmation Modal */}
                        <Modal
                            open={isDeleteModalOpen}
                            onOpenChange={setIsDeleteModalOpen}
                            title="确认解散团队"
                        >
                          <p>确定要解散该团队吗？此操作不可逆！</p>
                          <div className="flex justify-end gap-2">
                            <Button variant="secondary" onClick={handleCloseDeleteModal}>
                              取消
                            </Button>
                            <Button onClick={handleConfirmDelete}>确定</Button>
                          </div>
                        </Modal>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="joinedTeams">
              <div className="mt-4">
                <p className="text-gray-500">您已加入的团队将显示在这里。</p>
              </div>
            </TabsContent>
          </Tabs>

          {/* 团队设置 */}
          <div className="space-y-4 mt-8">
            <h3 className="font-medium flex items-center gap-2">
              <Settings className="w-5 h-5" /> 团队设置
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2">
                <span>团队可见性</span>
                {/* 根据团队的 published 状态动态显示 */}
                <Badge variant={currentOrg?.published ? "purple" : "green"}>
                  {currentOrg?.published ? "公开团队" : "私有团队"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 创建团队模态框 */}
      <Modal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        title="创建新团队"
      >
        <div className="space-y-4">
          <Input
            label="团队名称"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="请输入团队名称"
            required
          />
          <Textarea
            label="团队描述"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            placeholder="请输入团队描述（可选）"
          />
          <Input
            label="最大成员数"
            type="number"
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            placeholder="请输入最大成员数（默认50）"
            min="1"
            max="1000"
          />
          <div className="flex items-center justify-between p-2 border rounded-lg">
            <span className="text-sm">是否公开组织</span>
            <Switch
              checked={published}
              onChange={(checked) => setPublished(checked)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={closeCreateModal}>
              取消
            </Button>
            <Button onClick={handleCreateTeam} loading={isLoading.teams}>
              创建
            </Button>
          </div>
        </div>
      </Modal>

      {/* 编辑团队模态框 */}
      <Modal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="编辑团队信息"
      >
        <div className="space-y-4">
          <Input
            label="团队名称"
            value={editingTeam?.name || ''}
            onChange={(e) => setEditingTeam(prev => ({...prev, name: e.target.value}))}
          />
          <Textarea
            label="团队描述"
            value={editingTeam?.description || ''}
            onChange={(e) => setEditingTeam(prev => ({...prev, description: e.target.value}))}
          />
          <Input
            label="最大成员数"
            type="number"
            value={editingTeam?.maxMembers || 50}
            onChange={(e) => setEditingTeam(prev => ({...prev, maxMembers: e.target.value}))}
            min="1"
            max="1000"
          />
          <div className="flex items-center justify-between p-2 border rounded-lg">
            <span className="text-sm">公开组织</span>
            <Switch
              checked={editingTeam?.published || false}
              onChange={(checked) => setEditingTeam(prev => ({...prev, published: checked}))}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              取消
            </Button>
            <Button 
              onClick={() => handleUpdateOrganization(editingTeam.id, editingTeam)}
              loading={isLoading.teams}
            >
              保存更改
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamPage; 