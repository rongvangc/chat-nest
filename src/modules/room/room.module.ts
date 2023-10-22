import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
import { Room, RoomSchema } from './models/room.model';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
