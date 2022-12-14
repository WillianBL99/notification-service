import { randomUUID } from 'crypto';
import { PrismaService } from './prisma.service';
import { CreateNotificationBody } from './create-notification-body';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    return this.prismaService.notifications.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    await this.prismaService.notifications.create({
      data: {
        id: randomUUID(),
        category,
        content,
        recipientId,
      },
    });
  }
}
