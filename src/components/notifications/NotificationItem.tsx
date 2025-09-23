import { formatDistanceToNow } from 'date-fns';

export default function NotificationItem({ notification, onClick }: { notification: any; onClick?: () => void }) {
  return (
    <div className={`p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition ${!notification.isRead ? 'bg-gray-50 dark:bg-zinc-800' : ''}`} onClick={onClick}>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{notification.title}</div>
          <div className="text-sm text-gray-500">{notification.message}</div>
        </div>
        <div className="text-xs text-gray-400">{formatDistanceToNow(new Date(notification.createdAt))} ago</div>
      </div>
    </div>
  );
}