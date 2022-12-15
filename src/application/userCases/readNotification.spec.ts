import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factory/notificationFactory';
import { InMemoryNotificationRepository } from '@test/inMemoryRepository/inMemoryNotificationRepository';
import { ReadNotification } from './readNotification';

describe('Read notification', () => {
  let notificationsRepository: InMemoryNotificationRepository;
  let notification: Notification;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationRepository();
    notification = makeNotification();
    notificationsRepository.create(notification);
  });

  it('should be able to read a notification', async () => {
    const readNotification = new ReadNotification(notificationsRepository);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.items[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a inexistent notification', async () => {
    const readNotification = new ReadNotification(notificationsRepository);

    const sut = async () =>
      await readNotification.execute({
        notificationId: 'inexistent-id',
      });

    expect(sut).rejects.toThrow();
  });
});
