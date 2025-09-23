import NotificationItem from './NotificationItem';
import { useNotifications } from '../../hooks/useNotifications';

export default function NotificationCenter() {
  const { notifications, markAsRead } = useNotifications();

  const handleMarkAllRead = () => {
    markAsRead(notifications.map(n => n.id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>
        <button onClick={handleMarkAllRead} className="text-sm text-primary hover:underline">Tout marquer lu</button>
      </div>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {notifications.length === 0 && <div className="text-gray-500">Aucune notification</div>}
        {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
      </div>
    </div>
  );
}