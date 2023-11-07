import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageModelDocument } from '../models/message.model';
import {
  GetRoomMessageResponse,
  MessageType,
  SaveRoomMessageResponse,
} from '../interfaces/message.interface';
import { MessageDto } from '../dtos/message.dtos';
import { PusherService } from 'src/modules/pusher/services/pusher.service';
import { PusherEvent } from 'src/utils/pusherEvent';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageModelDocument>,
    private readonly pusherService: PusherService,
  ) {}

  async getRoomMessages(
    roomId: Types.ObjectId,
  ): Promise<GetRoomMessageResponse> {
    try {
      const normalizedRoomId = roomId.id;

      const messages = await this.messageModel.find({
        roomId: normalizedRoomId,
      });

      return {
        status: true,
        data: messages as MessageType[],
      };
    } catch (err) {
      return {
        status: true,
        data: [],
      };
    }
  }

  async saveRoomMessage(
    messageData: MessageDto,
  ): Promise<SaveRoomMessageResponse> {
    try {
      const createMessage = new this.messageModel(messageData);

      const newMessage = await createMessage.save();

      // Trigger pusher new message
      this.pusherService.trigger(
        messageData?.roomId,
        PusherEvent.NEW_MESSAGE,
        newMessage,
      );

      return {
        status: true,
        data: newMessage,
      };
    } catch (error) {
      throw error;
    }
  }
}
