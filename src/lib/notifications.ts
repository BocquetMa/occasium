import { prisma } from './prisma';
import toast from 'react-hot-toast';

export async function sendNotification(userId: number, type: string, title: string, message: string, entityId?: number) {
  const notification = await prisma.notification.create({
    data: { userId, type: type as any, title, message, entityId },
  });

  return notification;
}

export async function notifyNewEvent(associationId: number, event: any) {
  const memberships = await prisma.membership.findMany({ where: { associationId, status: 'ACTIVE' } });
  const notifications = [];
  for (const m of memberships) {
    notifications.push(await sendNotification(
      m.userId,
      'EVENT_CREATED',
      `Nouvel événement : ${event.title}`,
      `Un nouvel événement a été créé : ${event.title}`,
      event.id
    ));
  }
  return notifications;
}

export async function notifyInvitation(userId: number, associationName: string) {
  return sendNotification(userId, 'INVITATION_RECEIVED', 'Nouvelle invitation', `Vous avez été invité à rejoindre ${associationName}`);
}