import { makeNotification } from '@test/factory/notificationFactory';
import { InMemoryNotificationRepository } from '@test/inMemoryRepository/inMemoryNotificationRepository';
import { GetRecipientNotifications } from './getRecipientNotifications';

describe('Get recipient notifications', () => {
  let notificationsRepository: InMemoryNotificationRepository;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationRepository();
  });

  it('should get the recipient notifications', async () => {
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-01',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-01' }),
        expect.objectContaining({ recipientId: 'recipient-01' }),
      ]),
    );
  });
});
