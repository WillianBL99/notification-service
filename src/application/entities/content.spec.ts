import { Content } from './content';

describe('Content', () => {
  it('should be able to create a notification content', () => {
    const sut = new Content('You receive a notification by nodejs');

    expect(sut).toBeTruthy();
  });

  it('should not be able to create a notification with less than 5 characters', () => {
    const sut = () => new Content('aaa');

    expect(sut).toThrow();
  });

  it('should not be able to create a notification with more than 240 characters', () => {
    const sut = () => new Content('a'.repeat(241));

    expect(sut).toThrow();
  });
});
