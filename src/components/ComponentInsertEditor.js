// ComponentInsertEditor.js
import React, { useState } from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    closestCenter,
    useDraggable,
    useDroppable,
    DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const COMPONENTS = [
    { id: "table", label: "表格组件" },
    { id: "quote", label: "引用组件" },
    { id: "code", label: "代码块组件" },
];

export const ComponentInsertEditor = () => {
    const [blocks, setBlocks] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragStart = ({ active }) => setActiveId(active.id);
    const handleDragEnd = (event) => {
        const { over, active } = event;
        setActiveId(null);
        if (over?.id === "drop-area") {
            setBlocks((prev) => [
                ...prev,
                { id: crypto.randomUUID(), type: active.id },
            ]);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className="flex h-screen bg-gray-50">
                <div className="w-64 border-r p-4 space-y-2 bg-white">
                    <h2 className="text-lg font-semibold mb-2">组件库</h2>
                    {COMPONENTS.map((comp) => (
                        <DraggableItem key={comp.id} id={comp.id} label={comp.label} />
                    ))}
                </div>

                <div className="flex-1 p-6 overflow-auto">
                    <h1 className="text-xl font-bold mb-4">页面编辑区域</h1>
                    <DroppableArea>
                        {blocks.map((block) => (
                            <BlockRenderer key={block.id} type={block.type} />
                        ))}
                    </DroppableArea>
                </div>
            </div>

            <DragOverlay dropAnimation={null}>
                {activeId ? (
                    <div className="px-4 py-2 bg-blue-600 text-white rounded text-sm shadow">
                        {COMPONENTS.find((c) => c.id === activeId)?.label || "组件"}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

const DraggableItem = ({ id, label }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded cursor-move hover:bg-blue-200 text-sm"
        >
            {label}
        </div>
    );
};

const DroppableArea = ({ children }) => {
    const { setNodeRef, isOver } = useDroppable({ id: "drop-area" });
    return (
        <div
            ref={setNodeRef}
            className={`min-h-[300px] border-2 border-dashed rounded p-4 transition-colors ${
                isOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
            }`}
        >
            {children.length === 0 ? (
                <p className="text-gray-400 text-sm">拖拽组件到此处</p>
            ) : (
                <div className="space-y-4">{children}</div>
            )}
        </div>
    );
};

const BlockRenderer = ({ type }) => {
    switch (type) {
        case "table":
            return (
                <div className="border p-3 bg-white rounded">
                    <table className="w-full text-sm">
                        <thead>
                        <tr>
                            <th className="border px-2 py-1">列1</th>
                            <th className="border px-2 py-1">列2</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border px-2 py-1">数据1</td>
                            <td className="border px-2 py-1">数据2</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        case "quote":
            return (
                <blockquote
                    className="border-l-4 pl-4 italic text-gray-600 bg-white p-2 rounded"
                    contentEditable
                    suppressContentEditableWarning
                >
                    ❝ 可编辑引用内容
                </blockquote>
            );
        case "code":
            return (
                <pre
                    contentEditable
                    suppressContentEditableWarning
                    className="bg-gray-800 text-white p-3 rounded text-sm whitespace-pre-wrap"
                >
          // 可编辑代码块
        </pre>
            );
        default:
            return <div className="p-4 border">未知组件：{type}</div>;
    }
};
