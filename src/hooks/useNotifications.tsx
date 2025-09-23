import { useEffect, useState } from 'react';

export function useNotifications(pollInterval = 5000) {
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    const res = await fetch('/api/notifications');
    const data = await res.json();
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, pollInterval);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (ids: number[]) => {
    await fetch('/api/notifications', { method: 'POST', body: JSON.stringify({ notificationIds: ids }), headers: { 'Content-Type': 'application/json' } });
    setNotifications((prev) => prev.map(n => ids.includes(n.id) ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return { notifications, fetchNotifications, markAsRead, unreadCount };
}