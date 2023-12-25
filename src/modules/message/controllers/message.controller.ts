import { Param, Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { MessageDto, ReadMessageDto } from '../dtos/message.dtos';
import {
  GetRoomMessageResponse,
  ReadRoomMessageResponse,
  SaveRoomMessageResponse,
} from '../interfaces/message.interface';
import { Types } from 'mongoose';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(':id')
  async getRoomMessages(
    @Param() roomId: Types.ObjectId,
  ): Promise<GetRoomMessageResponse> {
    return this.messageService.getRoomMessages(roomId);
  }

  @Post()
  async saveRoomMessage(
    @Body() messageData: MessageDto,
  ): Promise<SaveRoomMessageResponse> {
    return this.messageService.saveRoomMessage(messageData);
  }

  @Post('read')
  async readRoomMessages(
    @Body() readMessageData: ReadMessageDto,
  ): Promise<ReadRoomMessageResponse> {
    return this.messageService.readRoomMessages(readMessageData);
  }
}
