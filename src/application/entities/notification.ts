import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';
import { Content } from './content';

export interface NotificationData {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  canceledAt?: Date | null;
}

export class Notification {
  private _id: string;
  private data: NotificationData;

  constructor(
    data: Replace<NotificationData, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.data = {
      ...data,
      createdAt: data.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId() {
    return this.data.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.data.recipientId = recipientId;
  }

  public get content(): Content {
    return this.data.content;
  }

  public set content(content: Content) {
    this.data.content = content;
  }

  public get category(): string {
    return this.data.category;
  }

  public set category(category: string) {
    this.data.category = category;
  }

  public get readAt(): Date | null | undefined {
    return this.data.readAt;
  }

  public read() {
    this.data.readAt = new Date();
  }

  public unread() {
    this.data.readAt = null;
  }

  public get createdAt(): Date {
    return this.data.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.data.createdAt = createdAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.data.canceledAt;
  }

  public cancel() {
    this.data.canceledAt = new Date();
  }
}
