import { Types } from 'mongoose';
import { User } from 'src/modules/users/models/user.model';

export type RoomType = {
  id: Types.ObjectId;
  admin: string;
  createdBy: string;
  name: string;
  users: User[];
};

export type CreateRoomResponse = {
  data: RoomType;
  status: boolean;
};

export type GetRoomsResponse = {
  data: RoomType[];
  status: boolean;
};

export type GetRoomResponse = {
  data: RoomType;
  status: boolean;
};
