import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configs/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConstants } from './modules/auth/constants/jwtConstants';
import { MessageModule } from './modules/message/message.module';
import { RoomModule } from './modules/room/room.module';
import { UserModule } from './modules/users/user.module';
import { PusherModule } from './modules/pusher/pusher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PassportModule.register({ session: true }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUrl'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MessageModule,
    RoomModule,
    PusherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
