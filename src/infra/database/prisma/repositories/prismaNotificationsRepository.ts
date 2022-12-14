import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../application/entities/notification';
import { NotificationsRepository } from '../../../../application/repositories/notificationsRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    console.log(
      'prisma create',
      await this.prismaService.notifications.findMany(),
    );
    console.log({
      id: notification.id,
      category: notification.category,
      // content: notification.content.value,
      // recipientId: notification.recipientId,
      // readAt: notification.readAt,
      // createdAt: notification.createdAt,
    });

    await this.prismaService.notifications.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
    console.log('prisma created');
  }
}
