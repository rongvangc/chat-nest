import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoomDto } from '../dtos/room.dtos';
import {
  CreateRoomResponse,
  GetRoomResponse,
  GetRoomsResponse,
} from '../interfaces/room.interface';
import { RoomService } from '../services/room.service';
import { UserToken, UserTokenType } from 'src/decorators/user.decorator';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  async getRooms(@UserToken() user: UserTokenType): Promise<GetRoomsResponse> {
    return this.roomService.getRooms(user);
  }

  @Get(':id')
  async getRoom(@Param('id') id: string): Promise<GetRoomResponse> {
    return this.roomService.getRoomById(id);
  }

  @Post()
  async createRoom(
    @Body() roomData: CreateRoomDto,
  ): Promise<CreateRoomResponse> {
    return this.roomService.createRoom(roomData);
  }
}
