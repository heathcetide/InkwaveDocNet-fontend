import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Editor } from "@/components/Editor";
import { CommentList } from "@/components/CommentList";
import { VersionHistory } from "@/components/VersionHistory";
import { Footer } from "@/components/Footer";
import { Tabs } from "@/components/Tabs";
import { Button } from "@/components/Button";
import { Avatar } from "@/components/Avatar";
import {
  Save, Undo, Redo, Share, Download, List, MessageSquare, Clock, Users, Type
} from "lucide-react";

const DocumentEditor = () => {
  const { docId } = useParams();
  const [content, setContent] = useState("");
  const [collaborators] = useState([
    { id: 1, name: "张三", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "李四", avatar: "https://i.pravatar.cc/150?img=2" }
  ]);
  const [activeTab, setActiveTab] = useState("comments");

  // 获取文档数据
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        // const res = await api.get(`/documents/${docId}`);
        // setContent(res.data.content);
      } catch (error) {
        console.error("获取文档失败:", error);
      }
    };
    fetchDocument();
  }, [docId]);

  return (
    <div className="flex flex-col h-screen">
      {/* 顶部工具栏 */}
      <Navbar themeColor="primary">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">正在编辑：文档标题</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" icon={<Save className="w-4 h-4" />}>
              保存
            </Button>
            <Button variant="ghost" size="sm" icon={<Undo className="w-4 h-4" />} />
            <Button variant="ghost" size="sm" icon={<Redo className="w-4 h-4" />} />
            <Button variant="ghost" size="sm" icon={<Share className="w-4 h-4" />}>
              分享
            </Button>
            <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
              导出
            </Button>
          </div>
        </div>
      </Navbar>

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧大纲导航 */}
        <div className="w-64 border-r bg-white dark:bg-neutral-900 p-4 overflow-y-auto">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <List className="w-4 h-4" /> 文档大纲
          </h3>
          <div className="space-y-2 text-sm">
            <div className="pl-2">第一章 项目背景</div>
            <div className="pl-4">1.1 项目起源</div>
            <div className="pl-4">1.2 目标设定</div>
            <div className="pl-2">第二章 实施方案</div>
          </div>
        </div>

        {/* 主编辑区域 */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <Editor value={content} onChange={setContent} />
          </div>
        </main>

        {/* 右侧侧边栏 */}
        <div className="w-80 border-l bg-white dark:bg-neutral-900">
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            items={[
              { value: "comments", label: "评论", icon: <MessageSquare className="w-4 h-4" /> },
              { value: "history", label: "历史版本", icon: <Clock className="w-4 h-4" /> },
              { value: "collaborators", label: "协作者", icon: <Users className="w-4 h-4" /> }
            ]}
          />
          
          <div className="p-4 h-[calc(100vh-160px)] overflow-y-auto">
            {activeTab === "comments" && <CommentList />}
            {activeTab === "history" && <VersionHistory />}
            {activeTab === "collaborators" && (
              <div className="space-y-2">
                {collaborators.map(user => (
                  <div key={user.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                    <Avatar src={user.avatar} size="sm" />
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部状态栏 */}
      <div className="border-t px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Type className="w-4 h-4" />
            <span>字数：{content.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{collaborators.length} 人正在编辑</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-green-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            已同步
          </div>
        </div>
      </div>
      
      <Footer className="border-t" />
    </div>
  );
};

export default DocumentEditor; 