import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';
import { Message, MessageSchema } from './models/message.model';
import { PusherModule } from '../pusher/pusher.module';

@Module({
  imports: [
    ConfigModule,
    PusherModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
