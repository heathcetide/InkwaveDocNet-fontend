import React from "react";
import ReactJson from 'react18-json-view';
import './json-viewer.css'; // 确保你引入了样式覆盖

/**
 * JSONViewer
 * @param {Object} data - 要展示的 JSON 数据
 * @param {Function} onEdit - 可选，支持编辑时触发回调
 * @param {Boolean} editable - 是否允许编辑
 */
export const JSONViewer = ({ data = {}, onEdit, editable = false }) => {
    return (
        <div className="rounded-lg border border-neutral-300 dark:border-neutral-700 p-4 bg-neutral-50 dark:bg-neutral-900 text-sm overflow-auto">
            <ReactJson
                src={data}
                theme="ocean"
                name={false}
                displayDataTypes={false}
                enableClipboard={(copy) => {
                    navigator.clipboard.writeText(copy);
                    return false; // 禁用原图标
                }}
                displayObjectSize={false}
                collapsed={2}
                onEdit={editable ? onEdit : false}
                onAdd={editable ? onEdit : false}
                onDelete={editable ? onEdit : false}
                style={{
                    fontFamily: 'Menlo, monospace',
                    fontSize: 13,
                    lineHeight: 1.5,
                }}
            />
        </div>
    );
};
