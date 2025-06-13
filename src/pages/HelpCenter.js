import React from "react";
import { Navbar } from "@/components/Navbar";
import { SiderMenu } from "@/components/SiderMenu";
import { Accordion } from "@/components/Accordion";
import { Footer } from "@/components/Footer";
import { Search, Mail, MessageSquare } from "lucide-react";

const HelpCenterPage = () => {
    const faqItems = [
        {
            title: "如何创建新文档？",
            content: "在首页点击'新建文档'按钮，选择模板或空白文档即可开始创建。"
        },
        {
            title: "如何邀请团队成员？",
            content: "在文档编辑页面右上角点击'分享'按钮，输入对方邮箱即可发送邀请。"
        },
    ];

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
            <div className="flex flex-1">
                <SiderMenu />
                <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-800">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="flex items-center gap-4">
                            <Search className="w-8 h-8 text-cyan-500" />
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">帮助中心</h1>
                        </div>

                        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl shadow">
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="搜索帮助内容..."
                                    className="flex-1 p-2 border rounded-lg"
                                />
                                <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg">
                                    搜索
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">常见问题</h2>
                            <Accordion items={faqItems} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="text-emerald-500" />
                                    <h3 className="text-lg font-semibold">邮件支持</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    发送邮件至 support@moxie.com，我们将在24小时内回复
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="text-violet-500" />
                                    <h3 className="text-lg font-semibold">在线客服</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    工作日 9:00-18:00 提供实时在线咨询
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default HelpCenterPage; 