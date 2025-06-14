import request from '@/utils/requestInstance';

/**
 * 创建组织
 */
export const createOrganization = (data) => {
    return request.post('/api/organization', data);
};

/**
 * 获取组织详情
 */
export const getOrganizationById = (id) => {
    return request.get(`/api/organization/${id}`);
};

/**
 * 切换当前组织
 */
export const switchOrganization = (id) => {
    return request.post(`/api/organization/switch/${id}`);
};

/**
 * 获取当前组织信息（已切换）
 */
export const getCurrentOrganization = () => {
    return request.get('/api/organization/current');
};

/**
 * 获取当前用户创建的组织列表
 */
export const getMyOrganizations = () => {
    return request.get('/api/organization/my');
};

/**
 * 解散组织
 * @param {number} id - 组织ID
 * @returns {Promise} 返回解散组织的响应
 */
export const deleteOrganization = (id) => {
    return request.post(`/api/organization/${id}/delete`);
};

/**
 * 更新组织信息
 * @param {number} id - 组织ID
 * @param {Object} data - 更新数据
 * @returns {Promise} 返回更新组织的响应
 */
export const updateOrganization = (id, data) => {
    return request.post(`/api/organization/${id}/update`, data);
};

/**
 * 生成邀请链接
 * @param data 邀请参数
 * @returns {*} 返回邀请码信息
 */
export const generateInvite = (data) => {
    return request.post(`/api/org_invite/create`, data)
}

/**
 * 验证邀请码
 * @param code 邀请码
 * @returns {*} 邀请码
 */
export const validateInvite = (code) => {
    return request.get(`/api/org_invite/validate/${code}`);
}


/**
 * 加入组织的API
 * @param {string} code - 邀请码
 * @returns {Promise} 返回加入组织的响应
 */
export const joinOrganizationByInvite = (code) => {
    return request.post(`/api/org_invite/use/${code}`);
};

/**
 * 获取当前用户参与的所有组织
 */
export const getMyJoinOrganizations = () => {
    return request.get('/api/organization_member/my-organizations');
};