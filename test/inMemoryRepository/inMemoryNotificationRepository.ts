import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notificationsRepository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public items: Notification[] = [];

  create(notification: Notification): Promise<void> {
    this.items.push(notification);
    return Promise.resolve();
  }
}
