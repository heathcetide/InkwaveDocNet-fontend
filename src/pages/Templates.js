import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/Button";
import { Tabs } from "../components/Tabs";
import { Input } from "../components/Input";
import { TemplateCard } from "../components/TemplateCard";
import { 
  FileText, Briefcase, Book, Presentation, Layout, Plus
} from "lucide-react";

const TemplatesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    { id: "all", label: "全部" },
    { id: "business", label: "商务", icon: <Briefcase className="w-4 h-4" /> },
    { id: "education", label: "教育", icon: <Book className="w-4 h-4" /> },
    { id: "design", label: "设计", icon: <Layout className="w-4 h-4" /> },
    { id: "presentation", label: "演示文稿", icon: <Presentation className="w-4 h-4" /> }
  ];

  const templates = [
    {
      id: 1,
      title: "商业计划书模板",
      category: "business",
      description: "专业商业计划书框架，助力项目启动",
      rating: 4.8,
      downloads: "1.2k",
      previewUrl: "/templates/business-plan.jpg",
      tags: ["商业", "融资", "战略"]
    },
    {
      id: 2,
      title: "学术论文模板",
      category: "education",
      description: "符合国际期刊标准的论文格式模板",
      rating: 4.6,
      downloads: "890",
      previewUrl: "/templates/research-paper.jpg",
      tags: ["学术", "论文", "格式"]
    }
  ];

  const filteredTemplates = templates.filter(t => 
    (activeCategory === "all" || t.category === activeCategory) &&
    (t.title || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar themeColor="primary" />
      
      <main className="flex-1 p-8 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* 头部操作栏 */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6" /> 模板中心
            </h1>
            <div className="flex gap-2 w-full md:w-96">
              <Input
                placeholder="搜索模板..." 
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                提交模板
              </Button>
            </div>
          </div>

          {/* 分类导航 */}
          <Tabs
            value={activeCategory}
            onChange={setActiveCategory}
            items={categories.map(c => ({
              value: c.id,
              label: c.label,
              icon: c.icon
            }))}
            fullWidth
          />

          {/* 模板列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <TemplateCard 
                key={template.id}
                template={template}
                onPreview={() => console.log("预览模板:", template.id)}
                onUse={() => console.log("使用模板:", template.id)}
              />
            ))}
          </div>

          {/* 模板详情模态框占位 */}
          {/* 实际应使用 Dialog 组件实现 */}
        </div>
      </main>
    </div>
  );
};

export default TemplatesPage; 