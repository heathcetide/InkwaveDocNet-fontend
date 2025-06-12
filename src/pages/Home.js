import React from "react";
import { Navbar } from "../components/Navbar";
import { SiderMenu } from "../components/SiderMenu";
import { Home, Users, Settings, FileText, BookOpen, Clipboard, Clock, TrendingUp } from "lucide-react";
import { Card } from "../components/Card";
import { Chart } from "../components/Chart";
import { Timeline } from "../components/Timeline";
import { ProgressBar } from "../components/ProgressBar";
import { Button } from "../components/Button";
import { useNotification } from "../components/NotificationCenter";
import { Carousel } from "../components/Carousel";
import { Footer } from "../components/Footer";

const HomePage = () => {
    // 导航栏链接
    const navLinks = [
        { label: "首页", href: "/" },
        { label: "文档库", href: "/library" },
        { label: "模板中心", href: "/templates" },
    ];

    // 用户信息（模拟）
    const user = {
        name: "张三",
        avatarUrl: "https://via.placeholder.com/150",
        menu: [
            { label: "个人中心", href: "/profile" },
            { label: "设置", href: "/settings" },
        ],
    };

    // 侧边栏菜单
    const menuItems = [
        { label: "仪表盘", icon: <Home className="w-5 h-5" />, path: "/dashboard" },
        { label: "文档管理", icon: <FileText className="w-5 h-5" />, path: "/documents" },
        { label: "模板中心", icon: <BookOpen className="w-5 h-5" />, path: "/templates" },
        { label: "我的团队", icon: <Users className="w-5 h-5" />, path: "/teams" },
        { label: "系统设置", icon: <Settings className="w-5 h-5" />, path: "/settings" },
    ];

    // 轮播图数据
    const carouselItems = [
        {
            image: "https://via.placeholder.com/1200x400",
            title: "实时协同编辑",
            description: "支持多人同时编辑，实时同步内容，提升团队协作效率。",
        },
        {
            image: "https://via.placeholder.com/1200x400",
            title: "版本历史管理",
            description: "自动保存历史版本，随时查看和恢复，确保内容安全。",
        },
        {
            image: "https://via.placeholder.com/1200x400",
            title: "丰富的模板库",
            description: "提供多种专业模板，助你快速创建高质量文档。",
        },
    ];

    // 功能介绍数据
    const features = [
        {
            title: "实时协同",
            description: "支持多人同时编辑，实时同步内容，提升团队协作效率。",
            icon: <Users className="w-8 h-8 text-cyan-500" />,
        },
        {
            title: "版本历史",
            description: "自动保存历史版本，随时查看和恢复，确保内容安全。",
            icon: <Clock className="w-8 h-8 text-emerald-500" />,
        },
        {
            title: "模板中心",
            description: "提供多种专业模板，助你快速创建高质量文档。",
            icon: <BookOpen className="w-8 h-8 text-violet-500" />,
        },
    ];

    // 用户案例数据
    const userCases = [
        {
            image: "https://via.placeholder.com/400x300",
            title: "某科技公司",
            description: "使用墨协后，团队协作效率提升了 50%。",
        },
        {
            image: "https://via.placeholder.com/400x300",
            title: "某教育机构",
            description: "墨协的模板功能帮助我们快速创建了标准化文档。",
        },
        {
            image: "https://via.placeholder.com/400x300",
            title: "某设计团队",
            description: "实时协同功能让我们的设计文档更加高效。",
        },
    ];

    // 数据统计
    const stats = [
        { label: "总文档数", value: "1,234", icon: <FileText className="w-6 h-6" />, color: "cyan" },
        { label: "今日新增", value: "56", icon: <TrendingUp className="w-6 h-6" />, color: "emerald" },
        { label: "待处理任务", value: "12", icon: <Clipboard className="w-6 h-6" />, color: "violet" },
        { label: "最近活跃", value: "3小时前", icon: <Clock className="w-6 h-6" />, color: "amber" },
    ];

    // 图表数据
    const chartData = [
        { name: "周一", value: 40 },
        { name: "周二", value: 30 },
        { name: "周三", value: 20 },
        { name: "周四", value: 27 },
        { name: "周五", value: 18 },
        { name: "周六", value: 23 },
        { name: "周日", value: 34 },
    ];

    // 时间线数据
    const timelineItems = [
        { time: "10:00", title: "创建文档", description: "创建了《项目计划书》", icon: <FileText /> },
        { time: "11:30", title: "更新模板", description: "更新了《会议纪要》模板", icon: <BookOpen /> },
        { time: "14:00", title: "协同编辑", description: "与李四协同编辑了《需求文档》", icon: <Users /> },
    ];

    const { addNotification } = useNotification();

    return (
        <div className="min-h-screen flex flex-col">
            {/* 顶部导航栏 */}
            <Navbar
                logo="墨协"
                logoIcon={<img src="/logo.svg" className="w-6 h-6" alt="logo" />}
                links={navLinks}
                user={user}
                onLogin={() => console.log("登录")}
                onLogout={() => console.log("退出登录")}
                themeColor="primary"
            />

            {/* 主体布局 */}
            <div className="flex flex-1">
                {/* 侧边栏 */}
                <SiderMenu menuItems={menuItems} themeColor="primary" />

                {/* 主内容区域 */}
                <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-800">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* 轮播图 */}
                        <Carousel items={carouselItems} />

                        {/* 功能介绍 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <Card key={index} className="p-6">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="mb-4">{feature.icon}</div>
                                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* 用户案例 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {userCases.map((caseItem, index) => (
                                <Card key={index} className="p-0 overflow-hidden">
                                    <img
                                        src={caseItem.image}
                                        alt={caseItem.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{caseItem.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {caseItem.description}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* 数据统计卡片 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <Card key={index} title={stat.label} className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </div>
                                        <div className={`text-${stat.color}-500`}>
                                            {stat.icon}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* 图表区域 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card title="文档活跃度">
                                <Chart type="line" data={chartData} dataKey="value" nameKey="name" height={300} />
                            </Card>
                            <Card title="任务进度">
                                <div className="space-y-4">
                                    <ProgressBar value={65} max={100} label="项目计划书" showValue />
                                    <ProgressBar value={40} max={100} label="需求文档" showValue />
                                    <ProgressBar value={80} max={100} label="会议纪要" showValue />
                                </div>
                            </Card>
                        </div>

                        {/* 时间线 */}
                        <Card title="最近活动">
                            <Timeline items={timelineItems} />
                        </Card>

                        {/* 快速操作 */}
                        <div className="flex gap-4">
                            <Button
                                icon={<FileText className="w-5 h-5" />}
                                onClick={() => addNotification({ title: "操作成功", message: "已创建新文档" })}
                            >
                                新建文档
                            </Button>
                            <Button
                                icon={<BookOpen className="w-5 h-5" />}
                                variant="green"
                                onClick={() => addNotification({ title: "操作成功", message: "已使用模板创建文档" })}
                            >
                                使用模板
                            </Button>
                            <Button
                                icon={<Users className="w-5 h-5" />}
                                variant="purple"
                                onClick={() => addNotification({ title: "操作成功", message: "已邀请成员协同编辑" })}
                            >
                                邀请协作
                            </Button>
                        </div>
                    </div>
                </main>
            </div>

            {/* 底部 */}
            <Footer />
        </div>
    );
};

export default HomePage;