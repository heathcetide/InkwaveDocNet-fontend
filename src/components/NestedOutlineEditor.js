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
import { nanoid } from "nanoid";
import { ChevronDown, ChevronRight } from "lucide-react";

export const NestedOutlineEditor = ({ items, onChange }) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = ({ active, over, delta }) => {
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        let newItems = arrayMove(items, oldIndex, newIndex);

        const moved = { ...newItems[newIndex] };
        const indentChange = Math.round(delta.x / 40);
        moved.level = Math.max(0, moved.level + indentChange);
        newItems[newIndex] = moved;

        onChange?.(newItems);
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                {items.map((item) => (
                    <SortableItem key={item.id} item={item} />
                ))}
            </SortableContext>
        </DndContext>
    );
};

const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        paddingLeft: `${item.level * 2}rem`,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-move transition-all"
        >
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 shrink-0" />
            <span className="text-sm text-gray-800 font-medium">{item.title}</span>
        </div>
    );
};
