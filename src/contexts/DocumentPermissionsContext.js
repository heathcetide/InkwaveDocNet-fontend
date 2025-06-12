import { createContext, useContext, useState } from 'react';

const DocumentPermissionsContext = createContext();

export const DocumentPermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState({});

  const checkPermission = (docId) => {
    // 实际应从API获取权限信息
    return permissions[docId] || true; // 默认允许编辑
  };

  return (
    <DocumentPermissionsContext.Provider value={{ checkPermission }}>
      {children}
    </DocumentPermissionsContext.Provider>
  );
};

export const useDocumentPermissions = () => useContext(DocumentPermissionsContext); 