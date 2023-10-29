import { Types } from 'mongoose';
import { PartialUser } from 'src/modules/users/models/user.model';

export type RoomType = {
  id: Types.ObjectId;
  admin: string;
  createdBy: string;
  name: string;
  users: PartialUser[];
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
