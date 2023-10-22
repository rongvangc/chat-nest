import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModelDocument } from 'src/modules/users/models/user.model';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { AuthCreateDto, AuthLoginDto } from '../dtos/auth.dtos';
import {
  CreateUserResponse,
  SigninResponse,
} from '../interfaces/auth.interface';

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
  }: AuthCreateDto): Promise<CreateUserResponse> {
    try {
      const existingUser = await this.userModel.findOne({ username }).exec();

      if (existingUser) {
        throw new ConflictException('Tên người dùng đã tồn tại');
      }

      const hash = encodePassword(password);

      const createUser = new this.userModel({ username, hash, displayName });

      await createUser.save();

      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async signIn({ username, password }: AuthLoginDto): Promise<SigninResponse> {
    try {
      const user = await this.userModel.findOne({ username });

      if (!user) {
        throw new HttpException(
          'Không tìm thấy người dùng',
          HttpStatus.NOT_FOUND,
        );
      }

      const isMatchPassword = comparePassword(password, user.hash);

      if (!isMatchPassword) {
        throw new UnauthorizedException();
      }

      return {
        access_token: this.jwtService.sign({
          username: user.username,
          displayName: user.displayName,
        }),
      };
    } catch (error) {
      throw error;
    }
  }
}
