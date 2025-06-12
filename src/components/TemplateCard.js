import React from "react";
import { Card } from "./Card"
import { Button } from "./Button"
import { Badge } from "./Badge"

import { Star, Download, ArrowRight } from "lucide-react";

export const TemplateCard = ({ template, onPreview, onUse }) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="aspect-video bg-gray-100 dark:bg-neutral-800 relative">
        <img 
          src={template.previewUrl}
          alt={template.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="ghost" onClick={onPreview}>
            快速预览
          </Button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg dark:text-white">{template.title}</h3>
          <div className="flex items-center gap-1 text-sm text-yellow-600">
            <Star className="w-4 h-4 fill-current" />
            {template.rating}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex-1">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {template.tags.map(tag => (
            <Badge key={tag} variant="gray">{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Download className="w-4 h-4" />
            {template.downloads}次下载
          </div>
          <Button 
            variant="primary" 
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={onUse}
          >
            使用模板
          </Button>
        </div>
      </div>
    </Card>
  );
}; 