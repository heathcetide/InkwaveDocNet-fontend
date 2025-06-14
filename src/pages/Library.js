import React, {useEffect, useState} from "react";
import { Navbar } from "@/components/Navbar";
import { 
    Search, FileText, Folder, Star, List, Grid, Plus, Upload, ChevronDown, Users, Menu, X, ChevronRight, Settings 
} from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import {Input} from "@/components/Input";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { NestedOutlineEditor } from "@/components/NestedOutlineEditor";
import { nanoid } from "nanoid";
import { RichTextEditor } from "@/components/RichTextEditor";
import {Divider} from "@/components/Divider";

const LibraryPage = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedPanel, setSelectedPanel] = useState("knowledgeBases");
    const [knowledgeBases, setKnowledgeBases] = useState([]);
    const [selectedBase, setSelectedBase] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarWidth, setSidebarWidth] = useState(240);
    const [isResizing, setIsResizing] = useState(false);
    const [showChildren, setShowChildren] = useState(true);

    // 响应式侧边栏状态
    const [sidebar] = useState({
        knowledgeBases: {
            collapsed: false,
            width: "w-64",
            minWidth: "min-w-[160px]",
            maxWidth: "max-w-[320px]"
        },
        documents: {
            collapsed: false,
            width: "w-72",
            minWidth: "min-w-[180px]",
            maxWidth: "max-w-[360px]"
        }
    });

    // 在组件状态中添加大纲数据
    const [outlineItems, setOutlineItems] = useState([
        { id: nanoid(), title: "总目录", level: 0 },
        { id: nanoid(), title: "第一章 产品概述", level: 1 },
        { id: nanoid(), title: "1.1 产品背景", level: 2 },
        { id: nanoid(), title: "1.2 核心功能", level: 2 },
        { id: nanoid(), title: "第二章 使用指南", level: 1 },
    ]);

    useEffect(() => {
        // fetchKnowledgeBases();
        // setKnowledgeBases([...]);
    }, []);

    useEffect(() => {
        if (selectedBase) {
            // fetchDocuments(selectedBase.id);
            // setDocuments([...]);
        }
    }, [selectedBase]);

    // 移动端自动折叠侧边栏
    useEffect(() => {
        if (!isDesktop) {
            setMobileMenuOpen(false);
        }
    }, [isDesktop]);

    // 侧边栏切换动画
    const getTransitionStyle = (panel) => ({
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        width: sidebar[panel].collapsed ? "0px" : sidebar[panel].width,
        minWidth: sidebar[panel].collapsed ? "0px" : sidebar[panel].minWidth,
        maxWidth: sidebar[panel].collapsed ? "0px" : sidebar[panel].maxWidth,
        overflow: "hidden"
    });

    // 模拟数据加载
    useEffect(() => {
        // 获取知识库列表
        const fetchKbs = async () => {
            const mockKbs = [
                { id: 1, name: "产品文档", docCount: 12 },
                { id: 2, name: "技术规范", docCount: 8 },
            ];
            setKnowledgeBases(mockKbs);
        };
        fetchKbs();
    }, []);

    // 获取文档列表
    useEffect(() => {
        if (selectedBase) {
            const mockDocs = [
                { id: 1, title: "产品需求文档", updatedAt: "2024-03-15" },
                { id: 2, title: "用户手册", updatedAt: "2024-03-14" },
            ];
            setDocuments(mockDocs.map(d => ({
                ...d,
                level: Number.isInteger(d.level) ? Math.max(0, d.level) : 0
            })));
        }
    }, [selectedBase]);

    // 自动保存文档内容
    useEffect(() => {
        if (selectedDoc) {
            const timeout = setTimeout(() => {
                updateDocumentContent(selectedDoc.id, selectedDoc.content);
            }, 1000);
            
            return () => clearTimeout(timeout);
        }
    }, [selectedDoc?.content]);

    const updateDocumentContent = async (docId, content) => {
        try {
            // await request.put(`/api/documents/${docId}`, { content });
            console.log('文档内容已保存');
        } catch (error) {
            console.error('保存失败:', error);
        }
    };

    // 侧边栏拖拽调整宽度
    const handleMouseDown = (e) => {
        setIsResizing(true);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizing) return;
        const newWidth = e.clientX;
        setSidebarWidth(Math.min(Math.max(200, newWidth), 400));
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    // 添加更新文档结构的API调用
    const updateDocumentStructure = async (orgId, newStructure) => {
        try {
            // 这里需要调用实际的后端API
            console.log('更新文档结构:', orgId, newStructure);
            // await request.put(`/api/organization/${orgId}/structure`, newStructure);
        } catch (error) {
            console.error('更新文档结构失败:', error);
        }
    };

    // 处理文档结构变化时同步parentId
    const handleStructureChange = (newDocs) => {
        const updatedDocs = newDocs.map(doc => ({
            ...doc,
            parentId: findParentId(doc, newDocs)
        }));
        
        setDocuments(updatedDocs);
        updateDocumentStructure(selectedBase.id, updatedDocs);
    };

    // 辅助函数：根据层级查找父级ID
    const findParentId = (doc, allDocs) => {
        if (doc.level === 0) return null;
        
        const prevDocs = allDocs.slice(0, allDocs.indexOf(doc));
        const parent = [...prevDocs].reverse().find(d => d.level === doc.level - 1);
        
        return parent?.id || null;
    };

    // 在文档列表渲染时处理层级关系
    const renderDocumentTree = (items, level = 0) => {
        return items
            .filter(doc => doc.level === level)
            .map((doc) => (
                <div key={doc.id} className="relative">
                    {/* 层级连接线 */}
                    {level > 0 && (
                        <div 
                            className="absolute left-4 top-5 w-px h-[calc(100%-1.5rem)] bg-gray-200"
                            style={{ left: `${level * 1.5}rem` }}
                        />
                    )}
                    
                    <div
                        className={cn(
                            "flex items-center gap-2 p-2 rounded hover:bg-gray-50",
                            selectedDoc?.id === doc.id && "bg-blue-50"
                        )}
                        style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
                    >
                        <ChevronRight className="w-4 h-4 text-gray-400 transform transition-transform" />
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="flex-1">{doc.title}</span>
                    </div>
                    
                    {/* 递归渲染子文档 */}
                    {renderDocumentTree(items, level + 1)}
                </div>
            ));
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar 
                logo="墨协" 
                logoIcon={<img src="/logo192.png" alt="logo" className="w-7 h-7" />}
                rightContent={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                }
            />

            <div className="flex flex-1 overflow-hidden">
                {/* 左侧知识库侧边栏 */}
                <div 
                    className="relative border-r bg-gray-50"
                    style={{ width: `${sidebarWidth}px` }}
                >
                    <div className="h-full flex flex-col">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Folder className="w-5 h-5" /> 知识库
                            </h2>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-2">
                            {knowledgeBases.map(kb => (
                                <div
                                    key={kb.id}
                                    onClick={() => setSelectedBase(kb)}
                                    className={cn(
                                        "group flex items-center justify-between p-2 rounded cursor-pointer",
                                        "hover:bg-gray-100 transition-colors",
                                        selectedBase?.id === kb.id && "bg-blue-50"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <Folder className="w-4 h-4 text-gray-500" />
                                        <span>{kb.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                                        <span className="text-sm text-gray-500">{kb.docCount}篇</span>
                                        <Settings className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* 可拖拽调整宽度的边界 */}
                    <div
                        className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-200"
                        onMouseDown={handleMouseDown}
                    />
                </div>

                {/* 中间文档列表主区域 */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* 文档操作工具栏 */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-4">
                            {selectedBase && (
                                <>
                                    <Button variant="ghost" size="sm">
                                        <Plus className="w-4 h-4 mr-2" /> 新建文档
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Upload className="w-4 h-4 mr-2" /> 导入文档
                                    </Button>
                                </>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <Input
                                placeholder="搜索文档..."
                                value={searchQuery}
                                onChange={setSearchQuery}
                                prefixIcon={<Search className="w-4 h-4" />}
                                className="w-64"
                            />
                            <div className="flex items-center gap-1">
                                <Button
                                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                                    size="icon"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "secondary" : "ghost"}
                                    size="icon"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* 文档列表内容 */}
                    {selectedDoc ? (
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <div className="p-4 border-b">
                                <h2 className="text-2xl font-bold">{selectedDoc.title}</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                <RichTextEditor 
                                    content={selectedDoc.content}
                                    onChange={(newContent) => {
                                        setDocuments(docs => 
                                            docs.map(d => 
                                                d.id === selectedDoc.id 
                                                    ? {...d, content: newContent} 
                                                    : d
                                            )
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            请从右侧选择或新建一个文档
                        </div>
                    )}
                </div>

                {/* 右侧文档目录侧边栏 */}
                <div className="w-72 border-l bg-gray-50 flex flex-col">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">文档结构</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            const newChild = {
                                id: nanoid(),
                                title: "新建子文档",
                                content: "",
                                level: selectedDoc.level + 1 || 0,
                                parentId: selectedDoc.id
                            };
                            setDocuments([...documents, newChild]);
                        }}
                    >
                        <Plus className="w-4 h-4 mr-2" /> 添加文档
                    </Button>

                    <Divider style={{ marginBottom: "20px" }} />
                    <div className="flex-1 overflow-y-auto p-4">

                        <NestedOutlineEditor 
                            items={documents}
                            onChange={handleStructureChange}
                            onSelect={setSelectedDoc}
                            selectedId={selectedDoc?.id}
                            documents={documents}
                        />
                    </div>

                    <div className="p-4 border-t">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => {
                                const newDoc = {
                                    id: nanoid(),
                                    title: "新文档",
                                    content: "",
                                    level: 0,
                                    parentId: null
                                };
                                setDocuments([...documents, newDoc]);
                            }}
                        >
                            <Plus className="w-4 h-4 mr-2" /> 新建文档
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryPage; 