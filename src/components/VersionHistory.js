import { useDocumentPermissions } from '../contexts/DocumentPermissionsContext';

export const VersionHistory = ({ docId }) => {
  const { canViewHistory } = useDocumentPermissions(docId);
  
  if (!canViewHistory) return <div>无权限查看历史版本</div>;
  
  return (<div>无权限查看历史版本</div>);
}; 