import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelDocument } from '../models/user.model';
import { Model } from 'mongoose';
import { GetUserResponse } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
  ) {}

  async getUser({ username }: UserDto): Promise<GetUserResponse> {
    const user = await this.userModel.findOne({
      username,
    });

    return {
      id: user?._id,
      username: user?.username,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    };
  }
}
