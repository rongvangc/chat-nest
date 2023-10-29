import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomModelDocument } from '../models/room.model';
import { CreateRoomDto } from '../dtos/room.dtos';
import {
  CreateRoomResponse,
  GetRoomResponse,
  GetRoomsResponse,
  RoomType,
} from '../interfaces/room.interface';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomModelDocument>,
  ) {}

  async getRooms(): Promise<GetRoomsResponse> {
    try {
      const rooms = (await this.roomModel
        .find({})
        .select('-messageIds')) as RoomType[];

      return {
        status: true,
        data: rooms,
      };
    } catch (error) {
      throw error;
    }
  }

  async getRoomById(id: string): Promise<GetRoomResponse> {
    try {
      const room = await this.roomModel.findById({ id });

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
      console.log(room);

      return {
        status: true,
        data: {
          id: room?._id,
          admin: room?.createdBy,
          createdBy: room?.createdBy,
          name: room?.name,
          userIds: room?.userIds,
        },
      };
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
