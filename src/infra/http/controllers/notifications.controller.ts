import { SendNotification } from '@application/userCases/sendNotification';
import { ReadNotification } from '@application/userCases/readNotification';
import { CancelNotification } from '@application/userCases/cancelNotification';
import { UnreadNotification } from '@application/userCases/unreadNotification';
import {
  CreateNotificationBody,
  NotificationId,
  RecipientId,
} from '../dtos/create-notification-body';
import { NotificationViewModels } from '../viewModels/notificationViewModels';
import { CountRecipientNotifications } from '@application/userCases/countRecipientNotifications';
import { GetRecipientNotifications } from '@application/userCases/getRecipientNotifications';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param() { id }: NotificationId) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param() { recipientId }: RecipientId) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param() { recipientId }: RecipientId) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModels.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param() { id }: NotificationId) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param() { id }: NotificationId) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModels.toHttp(notification),
    };
  }
}
