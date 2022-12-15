import { Module } from '@nestjs/common';
import { SendNotification } from '@application/userCases/sendNotification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@application/userCases/cancelNotification';
import { CountRecipientNotifications } from '@application/userCases/countRecipientNotifications';
import { GetRecipientNotifications } from '@application/userCases/getRecipientNotifications';
import { ReadNotification } from '@application/userCases/readNotification';
import { UnreadNotification } from '@application/userCases/unreadNotification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
