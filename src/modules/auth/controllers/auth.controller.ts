import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthCreateDto, AuthLoginDto } from '../dtos/auth.dtos';
import {
  CreateUserResponse,
  SigninResponse,
} from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() userData: AuthLoginDto): Promise<SigninResponse> {
    return this.authService.signIn(userData);
  }

  @Post('create')
  async create(@Body() userData: AuthCreateDto): Promise<CreateUserResponse> {
    return this.authService.create(userData);
  }
}
