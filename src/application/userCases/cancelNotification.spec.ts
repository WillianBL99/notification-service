import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factory/notificationFactory';
import { InMemoryNotificationRepository } from '@test/inMemoryRepository/inMemoryNotificationRepository';
import { CancelNotification } from './cancelNotification';

describe('Cancel notification', () => {
  let notificationsRepository: InMemoryNotificationRepository;
  let notification: Notification;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationRepository();
    notification = makeNotification();
    notificationsRepository.create(notification);
  });

  it('should be able to cancel a notification', async () => {
    const cancelNotification = new CancelNotification(notificationsRepository);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.items[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a inexistent notification', async () => {
    const cancelNotification = new CancelNotification(notificationsRepository);

    const sut = async () =>
      await cancelNotification.execute({
        notificationId: 'inexistent-id',
      });

    expect(sut).rejects.toThrow();
  });
});
