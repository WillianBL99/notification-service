import { makeNotification } from '@test/factory/notificationFactory';
import { InMemoryNotificationRepository } from '@test/inMemoryRepository/inMemoryNotificationRepository';
import { CountRecipientNotifications } from './countRecipientNotifications';

describe('Count recipient notifications', () => {
  let notificationsRepository: InMemoryNotificationRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationRepository();
  });

  it('should count the recipient notifications', async () => {
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-02' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );

    const sut = await countRecipientNotifications.execute({
      recipientId: 'recipient-01',
    });

    expect(sut).toBeTruthy();
    expect(sut.count).toBe(2);
  });

  it('should return 0 when the recipient do not has notifications', async () => {
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const sut = await countRecipientNotifications.execute({
      recipientId: 'recipient-id',
    });

    expect(sut).toBeTruthy();
    expect(sut.count).toBe(0);
  });
});
