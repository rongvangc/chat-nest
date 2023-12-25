import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserTokenType } from 'src/decorators/user.decorator';
import {
  MessageCount,
  MessageCountModelDocument,
} from 'src/modules/message/models/messageCount.model';
import { PusherService } from 'src/modules/pusher/services/pusher.service';
import { PusherEvent } from 'src/utils/pusherEvent';
import { CreateRoomDto } from '../dtos/room.dtos';
import {
  CreateRoomResponse,
  GetRoomResponse,
  GetRoomsResponse,
  RoomType,
} from '../interfaces/room.interface';
import { Room, RoomModelDocument } from '../models/room.model';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomModelDocument>,
    @InjectModel(MessageCount.name)
    private messageCountModel: Model<MessageCountModelDocument>,
    private readonly pusherService: PusherService,
  ) {}

  async getRooms(user: UserTokenType): Promise<GetRoomsResponse> {
    try {
      const rooms = await this.roomModel
        .find({ userIds: { $in: [user?._id] } })
        .populate('userIds', '_id username displayName photoURL')
        .sort({ updatedAt: -1 });

      const messagesCount = await this.messageCountModel.find({
        userId: user?._id,
      });

      const mappedData = rooms.map((room) => {
        const messageCount = messagesCount
          .find((count) => count.roomId.toString() === room._id.toString())
          .toObject().messageCount;

        return {
          ...room.toObject(),
          count: messageCount,
        };
      });

      return {
        status: true,
        data: mappedData,
      };
    } catch (error) {
      throw error;
    }
  }

  async getRoomById(id: string): Promise<GetRoomResponse> {
    try {
      const room = await this.roomModel.findById(id);

      return {
        status: true,
        data: room as RoomType,
      };
    } catch (error) {
      throw error;
    }
  }

  async createRoom({
    admin,
    createdBy,
    name,
    userIds,
  }: CreateRoomDto): Promise<CreateRoomResponse> {
    try {
      const createRoom = new this.roomModel({
        admin,
        createdBy,
        name,
        userIds,
      });

      const room = await createRoom.save();

      const newRoom = await this.roomModel
        .findById(room?._id)
        .populate('userIds', '_id username displayName photoURL');

      const messageCounts = userIds.map((userId) => ({
        roomId: room?._id,
        userId: userId,
        messageCount: 0,
      }));

      await this.messageCountModel.create(messageCounts);

      // Trigger pusher new room
      this.pusherService.trigger(userIds, PusherEvent.NEW_ROOM, {
        ...newRoom.toObject(),
        count: 0,
      });

      return {
        status: true,
        data: newRoom,
      };
    } catch (error) {
      throw error;
    }
  }
}
