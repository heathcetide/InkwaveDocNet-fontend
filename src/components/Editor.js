import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCollaboration } from '../hooks/useCollaboration';

export const Editor = ({ docId }) => {
  const { hasEditPermission, isLoading } = useCollaboration(docId);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>开始编辑...</p>',
    editable: hasEditPermission,
  });

  useEffect(() => {
    if (editor && !isLoading) {
      editor.setEditable(hasEditPermission);
    }
  }, [hasEditPermission, editor, isLoading]);

  if (isLoading) return <div className="animate-pulse">加载编辑权限...</div>;

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-neutral-800">
      <EditorContent editor={editor} />
      {!hasEditPermission && (
        <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
          您当前仅有查看权限
        </div>
      )}
    </div>
  );
}; 