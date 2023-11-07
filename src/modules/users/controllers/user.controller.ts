import { Controller, Get } from '@nestjs/common';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';
import {
  GetUserResponse,
  GetUsersResponse,
} from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@UserToken() user: UserTokenType): Promise<GetUserResponse> {
    return this.userService.getUser(user?._id);
  }

  @Get('all')
  async getAllUsers(
    @UserToken() user: UserTokenType,
  ): Promise<GetUsersResponse> {
    return this.userService.getAllUsers(user?._id);
  }
}
