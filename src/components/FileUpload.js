// components/FileUpload.js
import React, { useState } from "react";
import { Dropzone } from "./Dropzone";

export const FileUpload = ({ onChange }) => {
    const [files, setFiles] = useState([]);

    const handleAdd = (newFiles) => {
        const enrichedFiles = newFiles.map((file) => ({
            file,
            preview: file.type.startsWith("image/")
                ? URL.createObjectURL(file)
                : null,
        }));
        const all = [...files, ...enrichedFiles];
        setFiles(all);
        onChange?.(all.map((f) => f.file)); // 只传原始文件
    };

    const handleRemove = (index) => {
        const updated = files.filter((_, i) => i !== index);
        // 清理 URL.createObjectURL 占用的内存
        URL.revokeObjectURL(files[index]?.preview);
        setFiles(updated);
        onChange?.(updated.map((f) => f.file));
    };

    return (
        <div className="space-y-4">
            <Dropzone onFiles={handleAdd} />
            <ul className="space-y-2 text-sm text-gray-700">
                {files.map(({ file, preview }, idx) => (
                    <li
                        key={idx}
                        className="flex items-center gap-3 border rounded px-3 py-2"
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt={file.name}
                                className="w-10 h-10 object-cover rounded"
                            />
                        ) : (
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded text-xs">
                                {file.type === "application/pdf" ? "PDF" : "FILE"}
                            </div>
                        )}
                        <div className="flex-1 overflow-hidden">
                            <div className="truncate">{file.name}</div>
                            <div className="text-xs text-gray-400">
                                {(file.size / 1024).toFixed(1)} KB
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemove(idx)}
                            className="text-red-500 text-xs hover:underline"
                        >
                            删除
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
