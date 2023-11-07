import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetUserResponse,
  GetUsersResponse,
} from '../interfaces/user.interface';
import { User, UserModelDocument } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
  ) {}

  async getUser(id: string): Promise<GetUserResponse> {
    const user = await this.userModel.findById(id);

    return {
      _id: user?._id,
      username: user?.username,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    };
  }

  async getAllUsers(id: string): Promise<GetUsersResponse> {
    const users = await this.userModel
      .find({
        _id: { $ne: id },
      })
      .select('-hash -timestamp')
      .lean();

    return users;
  }
}
