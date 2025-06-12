// components/Dropzone.js
import * as React from "react";
import clsx from "clsx";

export const Dropzone = ({ onFiles, placeholder = "拖拽或点击上传文件", className }) => {
    const inputRef = React.useRef(null);

    const handleFiles = (files) => {
        if (onFiles && files?.length > 0) {
            onFiles(Array.from(files));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={clsx(
                "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-6 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors",
                className
            )}
        >
            <span>{placeholder}</span>
            <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
        </div>
    );
};
