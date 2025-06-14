import request from '@/utils/requestInstance';

/**
 * 发送验证码
 * @param {string} email - 邮箱地址
 * @returns {Promise<boolean>} 是否发送成功
 */
export const sendVerificationCode = (email) => {
  return request.get('/api/users/send-code/' + email);
};

/**
 * 邮箱注册账号
 * @param {Object} params - 注册信息
 * @param {string} params.email - 邮箱
 * @param {string} params.code - 验证码
 * @param {string} params.password - 密码
 */
export const registerByEmail = (params) => {
  return request.post('/api/users/register/email', params);
};

/**
 * 获取当前用户信息
 */
export const getUserInfo = () => {
  return request.get('/api/users/info');
};

/**
 * 邮箱登录
 * @param {Object} params - 登录信息
 * @param {string} params.email - 邮箱
 * @param {string} params.code - 验证码
 * @returns {Promise<string>} token
 */
export const loginByEmail = (params) => {
  return request.post('/api/users/login/email', params);
};

/**
 * 更新用户信息
 * @param {Object} user - 用户信息
 * @returns {Promise<User>} 更新后的用户信息
 */
export const updateUserInfo = (user) => {
  return request.put('/api/users/update', user);
};

/**
 * 退出登录
 * @returns {Promise<string>} 退出结果
 */
export const logout = () => {
  return request.post('/api/users/logout');
};

/**
 * 重置密码
 * @param {string} emailOrPhone - 邮箱或手机号
 * @param {string} newPassword - 新密码
 * @returns {Promise<void>}
 */
export const resetPassword = (emailOrPhone, newPassword) => {
  return request.post('/api/users/reset-password', null, {
    params: { emailOrPhone, newPassword }
  });
};

/**
 * 上传头像
 * @param {File} file - 头像文件
 * @returns {Promise<string>} 头像URL
 */
export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post('/api/users/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

/**
 * 注销账号
 * @returns {Promise<void>}
 */
export const deleteAccount = () => {
  return request.post('/api/users/delete-account');
};

/**
 * 更新用户偏好设置（如深色模式、邮箱通知等）
 * @param {Object} preferences - 用户偏好
 * @param {boolean} [preferences.themeDark] - 是否使用深色模式
 * @param {boolean} [preferences.emailNotifications] - 是否开启邮箱通知
 * @returns {Promise<void>}
 */
export const updateUserPreferences = (preferences) => {
  return request.post('/api/users/preferences', preferences);
};