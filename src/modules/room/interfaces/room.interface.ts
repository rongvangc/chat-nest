import { Types } from 'mongoose';

export type RoomType = {
  _id: Types.ObjectId;
  admin: string;
  createdBy: string;
  name: string;
  userIds: string[];
  count?: number;
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
