import { IsIn, IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(10, 200)
  content: string;

  @IsNotEmpty()
  @IsIn(['vendor', 'user'])
  category: string;
}
