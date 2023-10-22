import { Types } from 'mongoose';

export type GetUserResponse = {
  id: Types.ObjectId;
  displayName: string;
  photoURL: string;
  username: string;
};
