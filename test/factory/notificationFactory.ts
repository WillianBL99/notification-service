import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationData,
} from '@application/entities/notification';

type Override = Partial<NotificationData>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('new notification will be created'),
    recipientId: 'recipient-01',
    ...override,
  });
}
