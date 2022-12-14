import { InMemoryNotificationRepository } from '../../../test/inMemoryRepository/inMemoryNotificationRepository';
import { SendNotification } from './sendNotification';

describe('Send notification', () => {
  const notificationRepository = new InMemoryNotificationRepository();

  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationRepository);

    const { notification: sut } = await sendNotification.execute({
      recipientId: 'recipient-id',
      category: 'social',
      content: 'This is a notification',
    });

    expect(sut).toBeTruthy();
    expect(notificationRepository.items).toHaveLength(1);
    expect(notificationRepository.items[0]).toEqual(sut);
  });
});
