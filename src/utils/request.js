import axios from 'axios';

// 错误码映射表
const ErrorCodeMap = {
    SUCCESS: '请求成功',
    SYS_0001: '系统内部错误',
    SYS_0002: '数据库异常',
    SYS_0003: '服务不可用',
    SYS_0004: '第三方服务调用失败',
    SYS_0005: '请求频率过高',

    VAL_1001: '参数校验失败',
    VAL_1002: '缺少必要参数',
    VAL_1003: '参数不合法',

    AUTH_2001: '用户未登录或Token无效',
    AUTH_2002: '没有权限访问资源',

    BUS_3001: '业务处理异常',
    BUS_3002: '余额不足',
    BUS_3003: '商品库存不足',

    RES_4001: '资源不存在',
    RES_4002: '资源已存在',
};

// 构造 Request 实例
class Request {
    constructor(notification) {
        this.notification = notification;

        this.instance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            timeout: 10000,
        });

        this._setupInterceptors();
    }

    _setupInterceptors() {
        // 请求拦截器：注入 Token
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // 响应拦截器：统一处理 code !== 'SUCCESS' 的业务错误
        this.instance.interceptors.response.use(
            (response) => {
                const { code, message, data } = response.data;

                if (code !== 'SUCCESS') {
                    const errorMsg = message || ErrorCodeMap[code] || '请求失败';
                    return Promise.reject(new Error(errorMsg));
                }

                return data; // 返回 data 即可，组件里不再关心 code
            },
            (error) => {
                if (error.response) {
                    const { status, data } = error.response;

                    let message = '请求失败';
                    if (status === 401) {
                        message = '登录已过期，请重新登录';
                        window.location.href = '/login';
                    } else if (data?.code) {
                        message = ErrorCodeMap[data.code] || data.message || message;
                    }

                    this.notification?.addNotification({
                        title: '错误',
                        message,
                        type: 'error',
                    });
                } else if (error.request) {
                    this.notification?.addNotification({
                        title: '网络错误',
                        message: '无法连接服务器，请检查网络',
                        type: 'error',
                    });
                } else {
                    this.notification?.addNotification({
                        title: '异常',
                        message: error.message || '未知错误',
                        type: 'error',
                    });
                }

                return Promise.reject(error);
            }
        );
    }

    // 通用请求方法
    request(config) {
        return this.instance.request(config);
    }

    get(url, config = {}) {
        return this.request({ method: 'get', url, ...config });
    }

    post(url, data = {}, config = {}) {
        return this.request({ method: 'post', url, data, ...config });
    }

    put(url, data = {}, config = {}) {
        return this.request({ method: 'put', url, data, ...config });
    }

    delete(url, config = {}) {
        return this.request({ method: 'delete', url, ...config });
    }
}
export default Request;