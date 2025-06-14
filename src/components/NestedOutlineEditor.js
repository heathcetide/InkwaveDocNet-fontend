// components/NestedOutlineEditor.js
import React, { useState } from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    closestCenter,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, FileText, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const NestedOutlineEditor = ({ items, onChange, onSelect, documents }) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = ({ active, over, delta }) => {
        if (!over) return;

        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        
        // 计算嵌套层级
        const targetLevel = items[newIndex].level;
        const isNesting = delta.x > 20; // 向右拖拽超过20px视为嵌套
        const isLifting = delta.x < -20; // 向左拖拽超过20px视为提升层级

        let newLevel = items[oldIndex].level;
        if (isNesting) newLevel = targetLevel + 1;
        if (isLifting) newLevel = Math.max(0, Math.floor(targetLevel) - 1);

        // 限制最大嵌套深度
        newLevel = Math.min(Math.floor(newLevel), 4);

        const newItems = arrayMove(items, oldIndex, newIndex);
        newItems[newIndex] = {
            ...newItems[newIndex],
            level: newLevel,
            parentId: isNesting ? over.id : findParentId(newItems[newIndex], items)
        };

        onChange?.(newItems);
    };

    // 添加辅助函数
    const findParentId = (doc, allDocs) => {
        if (doc.level === 0) return null;
        
        const prevDocs = allDocs.slice(0, allDocs.indexOf(doc));
        const parent = [...prevDocs].reverse().find(d => d.level === doc.level - 1);
        
        return parent?.id || null;
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                    <SortableItem 
                        key={item.id} 
                        item={item} 
                        onClick={() => onSelect?.(item)}
                        documents={documents}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
};

const SortableItem = ({ item, onClick, selectedId, documents }) => {
    const [isDragging, setIsDragging] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    const handleClick = (e) => {
        if (!isDragging) {
            onClick?.();
        }
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div className="relative group">
            {/* 层级引导线 */}
            {Array.from({ length: Math.max(0, Math.floor(item.level || 0)) }).map((_, i) => (
                <div
                    key={i}
                    className="absolute left-0 top-0 h-full w-px bg-gray-200"
                    style={{ left: `${i * 1.5}rem` }}
                />
            ))}
            
            <div
                ref={setNodeRef}
                style={{
                    transform: CSS.Transform.toString(transform),
                    transition,
                    paddingLeft: `${item.level * 1.5}rem`,
                }}
                className={cn(
                    "group relative flex items-center gap-2",
                    "cursor-pointer transition-all mb-1",
                    selectedId === item.id && "bg-blue-100 border-blue-200"
                )}
                onClick={handleClick}
            >
                <div
                    {...attributes}
                    {...listeners}
                    onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    className="drag-handle opacity-0 group-hover:opacity-100"
                >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                
                <ChevronRight className="w-4 h-4 text-gray-400 transform transition-transform" />
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">{item.title}</span>
            </div>

            {/* 子文档指示器 */}
            {documents.some(d => d.parentId === item.id) && (
                <div className="ml-auto text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                </div>
            )}
        </div>
    );
};
