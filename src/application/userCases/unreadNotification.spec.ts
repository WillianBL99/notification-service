import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factory/notificationFactory';
import { InMemoryNotificationRepository } from '@test/inMemoryRepository/inMemoryNotificationRepository';
import { UnreadNotification } from './unreadNotification';

describe('Unread notification', () => {
  let notificationsRepository: InMemoryNotificationRepository;
  let notification: Notification;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationRepository();
    notification = makeNotification({ readAt: new Date() });
    notificationsRepository.create(notification);
  });

  it('should be able to unread a notification', async () => {
    const unreadNotification = new UnreadNotification(notificationsRepository);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.items[0].readAt).toBeNull();
  });

  it('should not be able to unread a inexistent notification', async () => {
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const sut = async () =>
      await unreadNotification.execute({
        notificationId: 'inexistent-id',
      });

    expect(sut).rejects.toThrow();
  });
});
