import { Body, Controller, Get } from '@nestjs/common';
import { UserDto } from '../dtos/user.dtos';
import { GetUserResponse } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async signIn(@Body() { username }: UserDto): Promise<GetUserResponse> {
    return this.userService.getUser({ username });
  }
}
