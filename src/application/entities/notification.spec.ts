import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const sut = new Notification({
      content: new Content('New credit line available'),
      category: 'social',
      recipientId: 'some-recipient-id',
    });

    expect(sut).toBeTruthy();
    expect(sut).toBeInstanceOf(Notification);
    expect(sut.content).toBeDefined();
    expect(sut.category).toBe('social');
  });
});
