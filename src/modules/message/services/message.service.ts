import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PusherService } from 'src/modules/pusher/services/pusher.service';
import { PusherEvent } from 'src/utils/pusherEvent';
import { MessageDto, ReadMessageDto } from '../dtos/message.dtos';
import {
  GetRoomMessageResponse,
  ReadRoomMessageResponse,
  SaveRoomMessageResponse,
} from '../interfaces/message.interface';
import { Message, MessageModelDocument } from '../models/message.model';
import {
  MessageCount,
  MessageCountModelDocument,
} from '../models/messageCount.model';
import { Room, RoomModelDocument } from 'src/modules/room/models/room.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageModelDocument>,
    @InjectModel(MessageCount.name)
    private messageCountModel: Model<MessageCountModelDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomModelDocument>,
    private readonly pusherService: PusherService,
  ) {}

  async getRoomMessages(
    roomId: Types.ObjectId,
  ): Promise<GetRoomMessageResponse> {
    try {
      const normalizedRoomId = roomId.id;

      const messages = await this.messageModel
        .find({
          roomId: normalizedRoomId,
        })
        .populate('recipientIds', '_id username displayName photoURL')
        .populate('senderId', '_id username displayName photoURL');

      return {
        status: true,
        data: messages,
      };
    } catch (err) {
      return {
        status: true,
        data: [],
      };
    }
  }

  async readRoomMessages({
    roomId,
    userId,
  }: ReadMessageDto): Promise<ReadRoomMessageResponse> {
    try {
      await this.messageCountModel.findOneAndUpdate(
        {
          roomId,
          userId,
        },
        { messageCount: 0 },
      );

      const update = { $set: { count: 0 } };

      const messageCountPromise = this.messageCountModel.updateOne(
        { userId },
        update,
        { upsert: true, new: true },
      );

      const updatedRoom = {
        roomId,
        count: update.$set.count,
      };

      // Trigger pusher update new count on room
      const pusherPromise = this.pusherService.trigger(
        userId,
        PusherEvent.UPDATE_ROOM,
        updatedRoom,
      );

      await Promise.all([messageCountPromise, pusherPromise]);

      return {
        status: true,
        data: {
          message: 'Updated count',
        },
      };
    } catch (err) {
      return {
        status: true,
        data: {
          message: 'Something wrong!',
        },
      };
    }
  }

  async saveRoomMessage(
    messageData: MessageDto,
  ): Promise<SaveRoomMessageResponse> {
    try {
      const createMessage = new this.messageModel(messageData);

      const newMessage = await createMessage.save();

      // query user & participant
      await newMessage.populate([
        {
          path: 'recipientIds',
          select: '_id username displayName photoURL',
        },
        {
          path: 'senderId',
          select: '_id username displayName photoURL',
        },
      ]);

      // Trigger pusher new message
      this.pusherService
        .trigger(messageData?.roomId, PusherEvent.NEW_MESSAGE, newMessage)
        .then(async () => {
          // create count message
          const recipientIds = messageData?.recipientIds;
          const update = { $inc: { messageCount: 1 } };

          const updatedRoom = {
            roomId: messageData?.roomId,
            count: update.$inc.messageCount,
          };

          const messageCountPromise = this.messageCountModel.updateMany(
            { userId: { $in: recipientIds } },
            update,
            { upsert: true, new: true },
          );

          // Update room
          const roomUpdated = this.roomModel.updateOne(
            {
              _id: messageData.roomId,
            },
            { $set: { updatedAt: Date.now() } },
          );

          // Trigger pusher update new count on room
          const pusherPromise = this.pusherService.trigger(
            recipientIds,
            PusherEvent.UPDATE_ROOM,
            updatedRoom,
          );

          await Promise.all([messageCountPromise, roomUpdated, pusherPromise]);
        });

      return {
        status: true,
        data: newMessage,
      };
    } catch (error) {
      throw error;
    }
  }
}
