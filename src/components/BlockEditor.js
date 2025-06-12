// components/BlockEditor.js
import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { nanoid } from "nanoid";

const DEFAULT_BLOCKS = [
    { id: nanoid(), type: "text", content: "欢迎使用 Block 编辑器！" },
    { id: nanoid(), type: "image", content: "https://via.placeholder.com/150" },
    { id: nanoid(), type: "text", content: "你可以拖动我到其他位置。" },
];

export const BlockEditor = () => {
    const [blocks, setBlocks] = useState(DEFAULT_BLOCKS);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return;

        const oldIndex = blocks.findIndex((b) => b.id === active.id);
        const newIndex = blocks.findIndex((b) => b.id === over.id);

        const reordered = arrayMove(blocks, oldIndex, newIndex);
        setBlocks(reordered);
        // ✨ 可发送 reorder 消息用于协同同步
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                    {blocks.map((block) => (
                        <SortableBlock key={block.id} block={block} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

const SortableBlock = ({ block }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: block.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm cursor-move"
        >
            {block.type === "text" && (
                <div
                    contentEditable
                    suppressContentEditableWarning
                    className="outline-none text-sm min-h-[1.5rem]"
                >
                    {block.content}
                </div>
            )}
            {block.type === "image" && (
                <img src={block.content} alt="" className="rounded w-full max-w-xs" />
            )}
        </div>
    );
};
