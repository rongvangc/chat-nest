import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User, UserModelDocument } from 'src/modules/users/models/user.model';

//** Not use for now */

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { jwt } = request.session;

    if (!jwt) throw new UnauthorizedException();

    const { username } = this.jwtService.verify(jwt);

    const user = this.userModel.findOne({ username }).exec();

    if (!user) throw new UnauthorizedException();

    return true;
  }
}
