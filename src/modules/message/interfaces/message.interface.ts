import { Types } from 'mongoose';
import { Message } from '../models/message.model';

export type MessageType = {
  _id: Types.ObjectId;
  roomId: string;
  content: string;
  senderId: string;
  recipientIds: string[];
};

export type RecipientData = {
  userId: string;
  isRead: boolean;
};

export type GetRoomMessageResponse = {
  status: boolean;
  data: Message[];
};

export type ReadRoomMessageResponse = {
  status: boolean;
  data: {
    message: string;
  };
};

export type SaveRoomMessageResponse = {
  status: boolean;
  data: Message;
};
