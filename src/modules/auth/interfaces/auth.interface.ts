import { Types } from 'mongoose';

export type SigninResponse = {
  id: Types.ObjectId;
  access_token: string;
};

export type CreateUserResponse = {
  status: boolean;
};
