import { Badge } from "./Badge";
import { Edit, Eye, MessageSquare } from "lucide-react";

export const PermissionBadge = ({ type }) => {
  const config = {
    edit: { icon: <Edit className="w-4 h-4" />, label: "可编辑", color: "green" },
    comment: { icon: <MessageSquare className="w-4 h-4" />, label: "可评论", color: "blue" },
    view: { icon: <Eye className="w-4 h-4" />, label: "仅查看", color: "gray" }
  }[type];

  return (
    <Badge variant={config.color} className="flex items-center gap-1">
      {config.icon}
      {config.label}
    </Badge>
  );
}; 