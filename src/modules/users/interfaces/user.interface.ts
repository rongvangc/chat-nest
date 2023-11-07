import { Types } from 'mongoose';

export type GetUserResponse = {
  _id: Types.ObjectId;
  displayName: string;
  photoURL: string;
  username: string;
};

export type GetUsersResponse = {
  _id: Types.ObjectId;
  displayName: string;
  photoURL: string;
  username: string;
}[];
