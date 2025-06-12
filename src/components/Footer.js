import React from "react";

export const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white py-8 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 版权信息 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">墨协</h3>
                        <p className="text-sm text-neutral-400">
                            © 2025 墨协. 保留所有权利。
                        </p>
                    </div>

                    {/* 友情链接 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">友情链接</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="text-sm text-neutral-400 hover:text-white">
                                    关于我们
                                </a>
                            </li>
                            <li>
                                <a href="/help" className="text-sm text-neutral-400 hover:text-white">
                                    帮助中心
                                </a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-sm text-neutral-400 hover:text-white">
                                    隐私政策
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 联系方式 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">联系我们</h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-neutral-400">
                                邮箱: <a href="mailto:heath-cetide@zohomail.com" className="hover:text-white transition">heath-cetide@zohomail.com</a>
                            </li>
                            <li className="text-sm text-neutral-400">电话: 195-8259-8441</li>
                            <li className="text-sm text-neutral-400">地址: 四川省成都市</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}; 