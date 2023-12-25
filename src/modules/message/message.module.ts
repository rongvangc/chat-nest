import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';
import { Message, MessageSchema } from './models/message.model';
import { PusherModule } from '../pusher/pusher.module';
import { MessageCount, MessageCountSchema } from './models/messageCount.model';
import { Room, RoomSchema } from '../room/models/room.model';

@Module({
  imports: [
    ConfigModule,
    PusherModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: MessageCount.name, schema: MessageCountSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
