import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { Switch } from "@/components/Switch";
import { Badge } from "@/components/Badge";
import { jsPDF } from "jspdf";
import { Users, Plus, Settings, Trash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import QRCode from "qrcode";
import {
  createOrganization, getMyJoinOrganizations,
  getMyOrganizations,
  switchOrganization,
  getCurrentOrganization, updateOrganization, deleteOrganization, generateInvite
} from "@/api/organization";
import { useNotification } from "@/components/NotificationCenter";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Skeleton } from "@/components/Skeleton";
import {useNavigate} from "react-router-dom";
import {QRCodeSVG} from "qrcode.react";

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
  const [myTeams, setMyTeams] = useState([]);
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

  // 团队邀请逻辑
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteCodeResult, setInviteCodeResult] = useState(null);
  const [inviteRole, setInviteRole] = useState("MEMBER");
  const [inviteMaxUses, setInviteMaxUses] = useState("");
  const [inviteExpiresAt, setInviteExpiresAt] = useState("");
  const [isGeneratedOnce, setIsGeneratedOnce] = useState(false);

  // 监听 activeTab 变化加载数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'joinedTeams') {
          const res = await getMyJoinOrganizations(); // 另一个接口，你需要自己实现
          setMyTeams(res || []);
        }
      } catch (err) {
        console.error('加载数据失败:', err);
      }
    };

    fetchData();
  }, [activeTab]);

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

  const handleGenerateInvite = async () => {
    if (!currentOrg?.id) return;
    try {
      const payload = {
        organizationId: currentOrg.id,
        role: inviteRole,
        maxUses: inviteMaxUses ? parseInt(inviteMaxUses) : null,
        expiresAt: new Date(inviteExpiresAt).toISOString().slice(0, 19) || null,
      };

      const res = await generateInvite(payload);
      setInviteCodeResult(res); // 后端返回 inviteUrl, qrCodeUrl
    } catch (err) {
      addNotification({
        title: "生成失败",
        message: err.response?.data?.message || err.message,
        type: "error"
      });
    }
  };

  const downloadInvitePDF = async (inviteCodeResult) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Invite Info", 10, 10);
    doc.setFontSize(12);
    doc.text(`Invite Code: ${inviteCodeResult.inviteCode}`, 10, 20);
    doc.text(`Short URL: ${inviteCodeResult.shortUrl}`, 10, 30);
    doc.text(`QR Link: ${inviteCodeResult.qrCodeUrl}`, 10, 40);

    // 使用 qrcode 将 URL 转为 base64 图片
    try {
      const qrDataUrl = await QRCode.toDataURL(inviteCodeResult.qrCodeUrl);
      doc.addImage(qrDataUrl, "PNG", 10, 50, 80, 80);
    } catch (err) {
      console.error("二维码生成失败", err);
      doc.text("二维码生成失败", 10, 50);
    }

    doc.save("invite.pdf");
  };

  // 提示信息
  const renderMessage = () => {
    if (isGeneratedOnce) {
      return <p className="text-red-600 text-sm">此邀请码仅能查看一次。</p>;
    }
    return <p className="text-green-600 text-sm">邀请码已成功生成，您可以导出。</p>;
  };

  useEffect(() => {
    const generatedOnce = localStorage.getItem('inviteGeneratedOnce');
    if (generatedOnce) {
      setIsGeneratedOnce(true);
    }
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

      const newOrg = teams.find(t => t.id === orgId);
      if (newOrg) {
        setCurrentOrg({ ...newOrg }); // 确保是新对象
      }
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
              {myTeams.length === 0 && !isLoading.teams && (
                  <div className="col-span-full text-center py-12">
                    <Users className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-4 text-gray-500">
                      {currentOrg ? "您尚未加入任何组织" : "请先创建或选择一个组织"}
                    </p>
                  </div>
              )}
              {myTeams.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {myTeams.map((team) => {
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
                              </div>
                            </div>
                          </Card>
                      );
                    })}
                  </div>
              )}
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
          {currentOrg && (
              <div className="mt-4">
                <Button variant="outline" onClick={() => setIsInviteModalOpen(true)}>
                  生成邀请码
                </Button>
              </div>
          )}
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
      <Modal
          open={isInviteModalOpen}
          onOpenChange={setIsInviteModalOpen}
          title="生成团队邀请码"
      >
        <div className="space-y-4">
          <Select
              label="邀请角色"
              value={inviteRole}
              onChange={value => setInviteRole(value)}
              options={[
                { value: "MEMBER", label: "成员" },
                { value: "ADMIN", label: "管理员" }
              ]}
          />

          <Input
              label="最大使用次数（可选）"
              type="number"
              value={inviteMaxUses}
              onChange={(e) => setInviteMaxUses(e.target.value)}
              placeholder="留空为无限"
          />

          <Input
              label="有效期（可选）"
              type="datetime-local"
              value={inviteExpiresAt}
              onChange={(e) => setInviteExpiresAt(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsInviteModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleGenerateInvite}>生成</Button>
          </div>

          {inviteCodeResult && (
              <div className="p-4 bg-gray-100 rounded mt-4">
                {/* Display the Invite Code */}
                <div className="flex justify-between mb-4">
                  <p className="text-sm text-gray-700">邀请码：</p>
                  <code className="text-blue-600">{inviteCodeResult.inviteCode}</code>
                </div>

                {/* Display the Short URL */}
                <div className="flex justify-between mb-4">
                  <p className="text-sm text-gray-700">短链接：</p>
                  <a
                      href={inviteCodeResult.shortUrl}
                      className="text-blue-600 break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    {inviteCodeResult.shortUrl}
                  </a>
                </div>

                {/* Display the QR Code */}
                <div className="flex justify-center mt-4">
                  <QRCodeSVG
                      value={inviteCodeResult.qrCodeUrl}
                      size={256}
                      level="H"
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                  />
                </div>

                {/* Message */}
                <div className="mt-4">
                  {renderMessage()}
                </div>

                {/* Export Button */}
                <div className="mt-4">
                  <Button onClick={() => downloadInvitePDF(inviteCodeResult)}>
                    导出邀请码为PDF
                  </Button>
                </div>
              </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TeamPage; 