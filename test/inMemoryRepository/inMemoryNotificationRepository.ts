import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repository/notificationsRepository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public items: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id === notificationId);

    return notification ?? null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.items.filter((item) => item.recipientId === recipientId);
  }

  async create(notification: Notification) {
    this.items.push(notification);
  }

  async update(notification: Notification): Promise<void> {
    const notificationIdx = this.items.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIdx >= 0) {
      this.items[notificationIdx] = notification;
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const recipientNotifications = this.items.filter(
      (item) => item.recipientId === recipientId,
    );

    return recipientNotifications.length;
  }
}
