import { useState, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationItem from './NotificationItem';
import { useNotifications } from '../../hooks/useNotifications';

export default function NotificationBell() {
  const { notifications, markAsRead, unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setOpen(!open);
    const ids = notifications.filter(n => !n.isRead).map(n => n.id);
    if (ids.length) markAsRead(ids);
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={handleClick} className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition">
        <FaBell />
        {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{unreadCount}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-zinc-800 shadow-lg rounded-lg z-50 animate-fade">
          {notifications.length === 0 ? <div className="p-4 text-gray-500">Aucune notification</div> :
            notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
        </div>
      )}
    </div>
  );
}