// components/BlockEditorMultiSelect.js
import React, { useRef, useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { nanoid } from "nanoid";

const DEFAULT_BLOCKS = Array.from({ length: 6 }).map((_, i) => ({
    id: nanoid(),
    type: "text",
    content: `Block ${i + 1}`,
}));

export const BlockEditorMultiSelect = () => {
    const [blocks, setBlocks] = useState(DEFAULT_BLOCKS);
    const [selectedIds, setSelectedIds] = useState([]);
    const editorRef = useRef(null);
    const selectionBox = useRef(null);
    const startPoint = useRef(null);

    const sensors = useSensors(useSensor(PointerSensor));

    const onDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return;
        const fromIndex = blocks.findIndex((b) => b.id === active.id);
        const toIndex = blocks.findIndex((b) => b.id === over.id);

        const idsToMove = selectedIds.includes(active.id)
            ? selectedIds
            : [active.id];

        const newOrder = [...blocks];
        idsToMove.forEach((id) => {
            const idx = newOrder.findIndex((b) => b.id === id);
            if (idx !== -1) newOrder.splice(idx, 1);
        });

        const insertIndex = toIndex;
        const itemsToInsert = blocks.filter((b) => idsToMove.includes(b.id));
        newOrder.splice(insertIndex, 0, ...itemsToInsert);
        setBlocks(newOrder);
    };

    const handleMouseDown = (e) => {
        const editor = editorRef.current;
        if (!editor) return;
        const rect = editor.getBoundingClientRect();
        startPoint.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        selectionBox.current.style.left = `${startPoint.current.x}px`;
        selectionBox.current.style.top = `${startPoint.current.y}px`;
        selectionBox.current.style.width = `0px`;
        selectionBox.current.style.height = `0px`;
        selectionBox.current.classList.remove("hidden");

        const onMouseMove = (moveEvent) => {
            const current = {
                x: moveEvent.clientX - rect.left,
                y: moveEvent.clientY - rect.top,
            };
            const x = Math.min(startPoint.current.x, current.x);
            const y = Math.min(startPoint.current.y, current.y);
            const width = Math.abs(current.x - startPoint.current.x);
            const height = Math.abs(current.y - startPoint.current.y);

            selectionBox.current.style.left = `${x}px`;
            selectionBox.current.style.top = `${y}px`;
            selectionBox.current.style.width = `${width}px`;
            selectionBox.current.style.height = `${height}px`;
        };

        const onMouseUp = () => {
            selectionBox.current.classList.add("hidden");

            const box = selectionBox.current.getBoundingClientRect();
            const selected = blocks.filter((block) => {
                const el = document.getElementById(`block-${block.id}`);
                if (!el) return false;
                const b = el.getBoundingClientRect();
                return (
                    b.left < box.right &&
                    b.right > box.left &&
                    b.top < box.bottom &&
                    b.bottom > box.top
                );
            });
            setSelectedIds(selected.map((b) => b.id));

            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div className="relative">
            {/* 框选区域 */}
            <div
                ref={selectionBox}
                className="absolute bg-blue-200 bg-opacity-30 border border-blue-400 pointer-events-none hidden"
                style={{ zIndex: 10 }}
            />
            <div
                ref={editorRef}
                onMouseDown={handleMouseDown}
                className="select-none p-4 space-y-2 border rounded"
            >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                        {blocks.map((block) => (
                            <BlockItem
                                key={block.id}
                                block={block}
                                selected={selectedIds.includes(block.id)}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

const BlockItem = ({ block, selected }) => {
    const {
        setNodeRef,
        transform,
        transition,
        attributes,
        listeners,
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        borderColor: selected ? "#3b82f6" : "#e5e7eb",
        backgroundColor: selected ? "#eff6ff" : "white",
    };

    return (
        <div
            id={`block-${block.id}`}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="border p-3 rounded cursor-move"
        >
            {block.content}
        </div>
    );
};
