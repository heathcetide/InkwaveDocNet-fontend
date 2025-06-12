import { AvatarGroup } from "./AvatarGroup";

export const TeamCard = ({ team }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{team.name}</h3>
        <span className="text-sm text-gray-500">{team.role}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AvatarGroup users={team.members.slice(0, 5)} />
          <span className="text-sm text-gray-500">
            {team.members.length} 位成员
          </span>
        </div>
        <div className="text-sm text-gray-500">
          文档数：{team.documents}
        </div>
      </div>
    </div>
  );
}; 