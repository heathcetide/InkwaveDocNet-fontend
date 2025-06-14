import request from '@/utils/requestInstance';

/**
 * 获取当前用户通知列表（分页 + 可选类型筛选）
 * @param {Object} params - 分页和筛选参数，例如 { page: 1, size: 10, type: 'SYSTEM' }
 */
export const getMyNotifications = (params) => {
    return request.get('/api/notification', { params });
};

/**
 * 获取未读通知数量（用于红点显示）
 */
export const getUnreadCount = () => {
    return request.get('/api/notification/unread-count');
};

/**
 * 标记单条通知为已读
 * @param {number} id - 通知ID
 */
export const markAsRead = (id) => {
    return request.post(`/api/notification/${id}/read`);
};

/**
 * 标记所有通知为已读
 */
export const markAllAsRead = () => {
    return request.post('/api/notification/readAll');
};

/**
 * 删除单条通知
 * @param {number} id - 通知ID
 */
export const deleteNotification = (id) => {
    return request.delete(`/api/notification/${id}`);
};

/**
 * 清空所有通知
 */
export const clearAllNotifications = () => {
    return request.delete('/api/notification/clear');
};
