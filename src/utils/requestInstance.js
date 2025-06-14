import Request from './request';
import { notificationCenter } from '@/components/NotificationCenter';

const request = new Request({
    addNotification: ({ title, message, type = 'error' }) => {
        notificationCenter.addNotification?.({ title, message, type });
    },
});

export default request;