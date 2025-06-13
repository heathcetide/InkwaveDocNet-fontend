import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { SiderMenu } from "@/components/SiderMenu";
import { 
    Search, FileText, Folder, Star, List, Grid, Plus, Upload, ChevronDown, Users 
} from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";

const LibraryPage = () => {
    // 视图模式状态
    const [viewMode, setViewMode] = useState('grid'); // grid | list
    // 搜索关键词
    const [searchQuery, setSearchQuery] = useState('');
    
    // 文档分类数据
    const categories = [
        {
            name: "我的文档",
            icon: <Folder className="w-4 h-4" />,
            children: [
                { name: "工作文档", count: 12 },
                { name: "个人项目", count: 5 },
                { name: "学习笔记", count: 8 }
            ]
        },
        {
            name: "收藏夹",
            icon: <Star className="w-4 h-4" />,
            count: 23
        },
        {
            name: "共享文档",
            icon: <Users className="w-4 h-4" />,
            count: 15
        }
    ];

    // 标签数据
    const tags = [
        { name: "重要", color: "bg-red-500" },
        { name: "进行中", color: "bg-blue-500" },
        { name: "已完成", color: "bg-green-500" },
        { name: "待审核", color: "bg-yellow-500" }
    ];

    // 模拟文档数据
    const documents = [
        {
            id: 1,
            title: "项目需求文档",
            type: "docx",
            updatedAt: "2小时前",
            tags: ["重要", "进行中"],
            starred: true,
            shared: true
        },
        // 更多文档数据...
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
                {/* 左侧侧边栏 */}
                <SiderMenu themeColor="primary" />
                
                {/* 主内容区域 */}
                <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-800">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* 操作栏 */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="flex gap-2">
                                <Button icon={<Plus className="w-5 h-5" />}>新建文档</Button>
                                <Button variant="secondary" icon={<Upload className="w-5 h-5" />}>
                                    导入文档
                                </Button>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="搜索文档..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                
                                <div className="flex gap-1 bg-white dark:bg-neutral-700 p-1 rounded-lg">
                                    <Button
                                        variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'primary' : 'ghost'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-8">
                            {/* 左侧分类面板 */}
                            <div className="w-64 space-y-6">
                                {/* 分类树 */}
                                <Card className="p-4">
                                    <h3 className="font-semibold mb-2">分类</h3>
                                    <div className="space-y-2">
                                        {categories.map((category, index) => (
                                            <div key={index} className="group">
                                                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        {category.icon}
                                                        <span>{category.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {category.count && (
                                                            <span className="text-sm text-gray-500">
                                                                {category.count}
                                                            </span>
                                                        )}
                                                        <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                                                    </div>
                                                </div>
                                                {category.children?.map((child, i) => (
                                                    <div
                                                        key={i}
                                                        className="ml-6 pl-2 text-sm flex items-center justify-between p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded"
                                                    >
                                                        <span>{child.name}</span>
                                                        <span className="text-gray-500">
                                                            {child.count}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                {/* 标签云 */}
                                <Card className="p-4">
                                    <h3 className="font-semibold mb-2">标签</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className={`${tag.color} text-white px-2 py-1 rounded-full text-sm`}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* 文档列表区域 */}
                            <div className="flex-1">
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {documents.map((doc) => (
                                            <Card key={doc.id} className="p-4 hover:shadow-lg transition-shadow">
                                                <div className="flex items-center justify-between mb-2">
                                                    <FileText className="w-6 h-6 text-primary-500" />
                                                    <div className="flex gap-2">
                                                        {doc.starred && <Star className="w-4 h-4 text-yellow-500" />}
                                                        {doc.shared && <Users className="w-4 h-4 text-blue-500" />}
                                                    </div>
                                                </div>
                                                <h4 className="font-medium truncate">{doc.title}</h4>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    最后修改：{doc.updatedAt}
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {doc.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full text-xs"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {documents.map((doc) => (
                                            <Card key={doc.id} className="p-4 hover:bg-gray-50 dark:hover:bg-neutral-700">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <FileText className="w-5 h-5 text-primary-500" />
                                                        <span className="font-medium">{doc.title}</span>
                                                        <span className="text-sm text-gray-500">
                                                            最后修改：{doc.updatedAt}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex gap-2">
                                                            {doc.tags.map((tag, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full text-xs"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <div className="flex gap-2 text-gray-400">
                                                            {doc.starred && <Star className="w-4 h-4" />}
                                                            {doc.shared && <Users className="w-4 h-4" />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default LibraryPage; 