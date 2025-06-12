import React from "react";
import { Navbar } from "../components/Navbar";
import { SiderMenu } from "../components/SiderMenu";
import { Footer } from "../components/Footer";
import { Shield } from "lucide-react";

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <SiderMenu />
                <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-800">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="flex items-center gap-4">
                            <Shield className="w-8 h-8 text-emerald-500" />
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">隐私政策</h1>
                        </div>

                        <div className="bg-white dark:bg-neutral-700 p-6 rounded-xl shadow space-y-6">
                            <section>
                                <h2 className="text-xl font-semibold mb-2">1. 信息收集范围</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    我们收集的信息仅限于实现协同编辑功能所需的最小数据集，包括：
                                </p>
                                <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>账户信息：注册时提供的姓名、邮箱等基本信息</li>
                                    <li>文档内容：用户主动创建或上传的文档数据</li>
                                    <li>操作日志：文档编辑历史、协作记录等操作信息</li>
                                    <li>设备信息：用于优化体验的设备类型、浏览器版本等基础信息</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-2">2. 数据使用规范</h2>
                                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                                    <p>我们承诺数据使用将严格遵循以下原则：</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>仅用于提供实时协同编辑、版本历史、文档分享等核心功能</li>
                                        <li>通过匿名化处理后的数据用于产品体验优化</li>
                                        <li>在获得明确授权后用于账户安全验证等必要场景</li>
                                        <li>绝不将用户文档内容用于任何形式的商业分析或第三方共享</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-2">3. 协同数据安全</h2>
                                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                                    <p>针对实时协同特性，我们采取多重保障措施：</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>端到端加密：所有文档内容采用AES-256加密传输和存储</li>
                                        <li>权限控制：细粒度的文档访问权限管理系统</li>
                                        <li>操作追溯：完整记录协作成员的编辑历史</li>
                                        <li>实时备份：每5分钟自动生成版本快照</li>
                                    </ul>
                                    <p className="pt-2">协同会话中临时数据将在会话结束后24小时内自动清除</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-2">4. 第三方服务</h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    我们仅与通过GDPR认证的云服务提供商合作，包括：
                                </p>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-neutral-800 rounded">
                                        <span className="font-medium">数据存储</span>
                                        <span className="text-sm">AWS S3 (新加坡区域)</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-neutral-800 rounded">
                                        <span className="font-medium">实时通信</span>
                                        <span className="text-sm">Socket.IO 加密通道</span>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-2">5. 您的权利</h2>
                                <div className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <p>您始终拥有以下权利：</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>通过文档历史版本功能随时回溯内容</li>
                                        <li>在文档设置中导出完整数据包</li>
                                        <li>通过账户安全中心管理设备授权</li>
                                        <li>联系 privacy@moxie.com 申请数据删除</li>
                                    </ul>
                                </div>
                            </section>

                            <div className="text-sm text-gray-500 border-t pt-4">
                                最后更新日期：2025年6月12日<br/>
                                生效日期：2025年6月12日
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicyPage; 