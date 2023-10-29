import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Message,
  MessageSchema,
} from 'src/modules/message/models/message.model';
import {
  PartialUser,
  PartialUserSchema,
} from 'src/modules/users/models/user.model';

export type RoomModelDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ trim: true })
  name: string;

  @Prop({ type: [PartialUserSchema] })
  users: PartialUser[];

  @Prop({ trim: true })
  createdBy: string;

  @Prop({ trim: true })
  admin: string;

  @Prop({ type: [MessageSchema] })
  messages: Message[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
