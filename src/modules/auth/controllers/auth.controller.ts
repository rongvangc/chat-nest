import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { MongoExceptionFilter } from 'src/exceptions/mongo.exception';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import { AuthCreateDto, AuthLoginDto } from '../dtos/auth.dtos';
import { SigninResponse } from '../interfaces/auth.interface';

@Public()
@UseFilters(MongoExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() userData: AuthLoginDto): Promise<SigninResponse> {
    return this.authService.signIn(userData);
  }

  @Post('create')
  async create(@Body() userData: AuthCreateDto): Promise<string> {
    return this.authService.create(userData);
  }
}
