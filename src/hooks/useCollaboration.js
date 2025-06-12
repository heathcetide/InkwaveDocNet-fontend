import { useEffect, useState } from 'react';
import { useDocumentPermissions } from '../contexts/DocumentPermissionsContext';

export const useCollaboration = (docId) => {
  const { checkPermission } = useDocumentPermissions();
  const [collaborators, setCollaborators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取协作者列表
        // const collabRes = await api.get(`/documents/${docId}/collaborators`);
        // setCollaborators(collabRes.data);
        
        // 获取权限状态
        // const permRes = await checkPermission(docId);
        setCollaborators([{ id: 1, name: '示例用户' }]); // 临时数据
        setIsLoading(false);
      } catch (error) {
        console.error('协作数据获取失败:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [docId, checkPermission]);

  const hasEditPermission = checkPermission ? checkPermission(docId) : false;

  const updatePermission = async (userId, newPermissions) => {
    // 实际应调用API
    setPermissions(prev => ({
      ...prev,
      [userId]: newPermissions
    }));
  };

  return {
    hasEditPermission,
    collaborators,
    isLoading,
    permissions,
    updatePermission
  };
}; 