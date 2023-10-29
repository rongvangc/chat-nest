import { IsArray, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsArray()
  userIds: string[];

  @IsString()
  createdBy: string;

  @IsString()
  admin: string;
}
