interface MemberCardProps {
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

export default function MemberCard({ firstName, lastName, role, avatar }: MemberCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 flex items-center space-x-4">
      <img src={avatar || '/default-avatar.png'} alt={`${firstName} ${lastName}`} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="font-semibold">{firstName} {lastName}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
}