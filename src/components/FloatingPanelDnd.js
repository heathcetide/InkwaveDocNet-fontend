// components/FloatingPanelDnd.js
import React, { useState } from "react";
import {
    DndContext,
    useDraggable,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";

export const FloatingPanelDnd = ({
                                     title = "浮动面板",
                                     defaultPosition = { x: 200, y: 100 },
                                     children,
                                 }) => {
    const [pos, setPos] = useState(defaultPosition);

    const sensors = useSensors(useSensor(PointerSensor));

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={(e) => {
                const { delta } = e;
                setPos((prev) => ({
                    x: prev.x + delta.x,
                    y: prev.y + delta.y,
                }));
            }}
        >
            <DraggablePanel x={pos.x} y={pos.y} title={title}>
                {children}
            </DraggablePanel>
        </DndContext>
    );
};

const DraggablePanel = ({ x, y, title, children }) => {
    const { attributes, listeners, setNodeRef} = useDraggable({
        id: "floating-panel",
    });

    const style = {
        transform: `translate3d(${x}px, ${y}px, 0)`,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="fixed z-50 w-64 bg-white border rounded-xl shadow-lg"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-move bg-gray-100 px-3 py-2 text-sm font-medium rounded-t-xl"
            >
                {title}
            </div>
            <div className="p-3">{children}</div>
        </div>
    );
};
