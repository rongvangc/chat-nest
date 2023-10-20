import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { SigninResponse } from '../interfaces/auth.interface';
import { AuthCreateDto, AuthLoginDto } from '../dtos/auth.dtos';
import { User, UserModelDocument } from 'src/modules/users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
    private jwtService: JwtService,
  ) {}

  async create({
    username,
    password,
    displayName,
  }: AuthCreateDto): Promise<string> {
    const hash = encodePassword(password);

    const createUser = new this.userModel({ username, hash, displayName });

    createUser.save();

    return `Create user ${username} success`;
  }

  async signIn({ username, password }: AuthLoginDto): Promise<SigninResponse> {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) throw new HttpException("Can't find user", HttpStatus.NOT_FOUND);

    const isMathPassword = comparePassword(password, user.hash);

    if (!isMathPassword) throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        displayName: user.displayName,
      }),
    };
  }
}
