import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './controllers/room.controller';
import { Room, RoomSchema } from './models/room.model';
import { RoomService } from './services/room.service';
import { PusherModule } from '../pusher/pusher.module';
import {
  MessageCount,
  MessageCountSchema,
} from '../message/models/messageCount.model';

@Module({
  imports: [
    ConfigModule,
    PusherModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([
      { name: MessageCount.name, schema: MessageCountSchema },
    ]),
  ],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
