import { IsArray, IsString } from 'class-validator';
import { PartialUser } from 'src/modules/users/models/user.model';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsArray()
  users: PartialUser[];

  @IsString()
  createdBy: string;

  @IsString()
  admin: string;
}
