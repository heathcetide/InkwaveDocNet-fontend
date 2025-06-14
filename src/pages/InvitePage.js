import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/components/NotificationCenter';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Skeleton } from '@/components/Skeleton';
import { Badge } from '@/components/Badge';
import { joinOrganizationByInvite, validateInvite } from '@/api/organization';
import { Navbar } from '@/components/Navbar';
import { QRCodeSVG } from 'qrcode.react';

const InvitePage = () => {
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
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get("code");
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [inviteInfo, setInviteInfo] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  // 获取邀请信息
  useEffect(() => {
    const fetchInviteInfo = async () => {
      try {
        const res = await validateInvite(inviteCode);
        setInviteInfo(res);
      } catch (error) {
        addNotification({
          title: '加载失败',
          message: error.response?.data?.message || error.message,
          type: 'error'
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchInviteInfo();
  }, [inviteCode]);

  // 处理加入团队
  const handleJoinTeam = async () => {
    if (!user) {
      addNotification({
        title: '请先登录',
        message: '登录后即可加入团队',
        type: 'warning'
      });
      navigate(`/login?redirect=/invite/${inviteCode}`);
      return;
    }

    try {
      setIsJoining(true);
      await joinOrganizationByInvite(inviteCode);
      
      addNotification({
        title: '加入成功',
        message: `您已成功加入 ${inviteInfo.organizationName}`,
        type: 'success'
      });
      navigate('/team');
    } catch (error) {
      addNotification({
        title: '加入失败',
        message: error.response?.data?.message || error.message,
        type: 'error'
      });
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="max-w-2xl mx-auto p-4 w-full">
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!inviteInfo) return null;

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
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 space-y-6">
            {/* 团队信息 */}
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                邀请加入 {inviteInfo.organizationName}
              </h1>
              <p className="text-gray-600 mb-4">
                {inviteInfo.organizationDescription || '暂无描述'}
              </p>
              <Badge variant="blue">
                邀请人：{inviteInfo.inviterUsername}
              </Badge>
            </div>

            {/* 二维码展示 */}
            <div className="border rounded-lg p-4 flex flex-col items-center">
              <QRCodeSVG 
                value={window.location.href}
                size={200}
                className="mb-4"
              />
              <p className="text-sm text-gray-500">
                扫描二维码快速加入团队
              </p>
            </div>

            {/* 状态提示 */}
            {inviteInfo.status === 'EXPIRED' && (
              <div className="text-center text-red-500">
                该邀请码已过期
              </div>
            )}
            {inviteInfo.status === 'USED_UP' && (
              <div className="text-center text-red-500">
                该邀请码已达到使用上限
              </div>
            )}
            {inviteInfo.status === 'INVALID' && (
                <div className="text-center text-red-500">
                  该团队不存在
                </div>
            )}
            {/* 操作按钮 */}
            {inviteInfo.status === 'VALID' && (
              <Button
                onClick={handleJoinTeam}
                loading={isJoining}
                className="w-full"
                variant="primary"
              >
                {user ? '立即加入' : '登录后加入'}
              </Button>
            )}

            {/* 附加信息 */}
            <div className="text-sm text-gray-500 space-y-2">
              {inviteInfo.expiresAt && (
                <p>有效期至：{new Date(inviteInfo.expiresAt).toLocaleDateString()}</p>
              )}
              {inviteInfo.maxUses && (
                <p>剩余次数：{inviteInfo.maxUses - inviteInfo.usedCount}</p>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default InvitePage; 