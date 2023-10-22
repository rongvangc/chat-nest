import { IsArray, IsString } from 'class-validator';
import { User } from 'src/modules/users/models/user.model';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsArray()
  users: User[];

  @IsString()
  createdBy: string;

  @IsString()
  admin: string;
}
