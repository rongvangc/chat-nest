import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoomModelDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ trim: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  userIds: string[];

  @Prop({ trim: true })
  createdBy: string;

  @Prop({ trim: true })
  admin: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
