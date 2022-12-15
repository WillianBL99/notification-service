import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/userCases/sendNotification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModels } from '../viewModels/notificationViewModels';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

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
