import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

// 添加响应拦截器处理401错误
client.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default client; 