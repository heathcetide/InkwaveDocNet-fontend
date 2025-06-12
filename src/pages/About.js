import React from "react";
import { Navbar } from "../components/Navbar";
import { SiderMenu } from "../components/SiderMenu";
import { Timeline } from "../components/Timeline";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Users, Clock, Handshake, Mail, ArrowRight } from "lucide-react";

const AboutPage = () => {
    const timelineItems = [
        {
            time: "2025.06",
            title: "项目启动",
            description: "墨协项目正式立项，开始原型设计",
            icon: <Clock />,
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar themeColor="primary" />
            <div className="flex flex-1">
                <SiderMenu themeColor="primary" />
                <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-800">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">关于我们</h1>
                        
                        <Card title="公司简介" className="p-6">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                墨协科技成立于2020年，专注于提供高效的协同办公解决方案。我们的使命是通过技术创新，帮助团队更高效地协作和创造价值。作为实时协同文档编辑领域的先行者，我们致力于：
                            </p>
                            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                                <li>提供零延迟的实时协作体验</li>
                                <li>构建安全可靠的数据管理体系</li>
                                <li>打造开放可扩展的文档生态</li>
                            </ul>
                        </Card>

                        <Card title="核心团队" className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-700 rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                                        <Users className="text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">技术团队</h3>
                                        <p className="text-sm text-gray-500">15位资深工程师</p>
                                    </div>
                                </div>
                                {/* 更多团队成员... */}
                            </div>
                        </Card>

                        <Card title="发展历程" className="p-6">
                            <Timeline items={timelineItems} />
                        </Card>

                        <Card title="生态合作" className="p-6">
                            <div className="space-y-4">
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Handshake className="w-6 h-6 text-indigo-500" />
                                        <div>
                                            <h3 className="font-semibold">合作伙伴招募</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                我们期待与云服务、企业服务等领域的优质伙伴合作，共同打造更好的协同体验
                                            </p>
                                            <a 
                                                href="mailto:heath-cetide@zohomail.com" 
                                                className="mt-2 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                                            >
                                                <Mail className="w-4 h-4 mr-1" />
                                                提交合作提案
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="p-4 border rounded-lg flex items-center gap-3">
                                        <div className="flex-1">
                                            <h4 className="font-medium">技术合作</h4>
                                            <p className="text-sm text-gray-500">实时通信/存储解决方案</p>
                                        </div>
                                        <ArrowRight className="text-gray-400" />
                                    </div>
                                    <div className="p-4 border rounded-lg flex items-center gap-3">
                                        <div className="flex-1">
                                            <h4 className="font-medium">生态合作</h4>
                                            <p className="text-sm text-gray-500">模板/插件市场共建</p>
                                        </div>
                                        <ArrowRight className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage; 