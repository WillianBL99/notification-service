import { Notification } from '../../src/application/entities/notification';
import { NotificationsRepository } from '../../src/application/repositories/notificationsRepository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public items: Notification[] = [];

  create(notification: Notification): Promise<void> {
    this.items.push(notification);
    return Promise.resolve();
  }
}
