import React from "react";
import { Dialog, Button } from "./";

export const TemplatePreviewModal = ({ template, isOpen, onClose }) => {
  if (!template) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="xl">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{template.title}</h3>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={template.previewUrl}
            alt={template.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            关闭
          </Button>
          <Button variant="primary" onClick={template.onUse}>
            使用此模板
          </Button>
        </div>
      </div>
    </Dialog>
  );
}; 