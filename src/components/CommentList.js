import React, { useState } from 'react';
import { Button } from './Button';
import { Textarea } from './Textarea';

export const CommentList = () => {
  const [comments, setComments] = useState([
    { id: 1, user: '李四', text: '这里需要补充市场分析数据', time: '11:20' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments([...comments, {
      id: Date.now(),
      user: '当前用户',
      text: newComment,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium">{comment.user}</div>
            <span className="text-sm text-gray-500">{comment.time}</span>
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="输入评论..."
          className="mb-2"
        />
        <Button type="submit" size="sm">提交评论</Button>
      </form>
    </div>
  );
}; 