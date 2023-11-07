import { Types } from 'mongoose';

export type MessageType = {
  _id: Types.ObjectId;
  roomId: string;
  content: string;
  senderId: string;
  recipientIds: string[];
};

export type GetRoomMessageResponse = {
  status: boolean;
  data: MessageType[];
};

export type SaveRoomMessageResponse = {
  status: boolean;
  data: MessageType;
};
