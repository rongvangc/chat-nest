import { Types } from 'mongoose';

export type GetUserResponse = {
  id: Types.ObjectId;
  displayName: string;
  photoURL: string;
  username: string;
};

export type GetUsersResponse = {
  id: Types.ObjectId;
  displayName: string;
  photoURL: string;
  username: string;
}[];
