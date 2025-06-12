import { CheckboxGroup } from "@headlessui/react";

export const PermissionSelector = ({ value, onChange }) => {
  const permissions = [
    { id: 'edit', label: '编辑', icon: <Edit className="w-4 h-4" /> },
    { id: 'comment', label: '评论', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'view', label: '查看', icon: <Eye className="w-4 h-4" /> }
  ];

  return (
    <CheckboxGroup value={value} onChange={onChange} className="flex gap-4">
      {permissions.map((perm) => (
        <CheckboxGroup.Option
          key={perm.id}
          value={perm.id}
          className={({ checked }) => clsx(
            "flex items-center gap-2 p-2 border rounded-lg cursor-pointer",
            checked ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200"
          )}
        >
          {perm.icon}
          <span>{perm.label}</span>
        </CheckboxGroup.Option>
      ))}
    </CheckboxGroup>
  );
}; 