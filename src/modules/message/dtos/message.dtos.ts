import { IsString, IsArray } from 'class-validator';

export class MessageDto {
  @IsString()
  roomId: string;

  @IsString()
  content: string;

  @IsString()
  senderId: string;

  @IsArray()
  recipientIds: string[];
}
