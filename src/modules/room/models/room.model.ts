import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Message,
  MessageSchema,
} from 'src/modules/message/models/message.model';
import { User, UserSchema } from 'src/modules/users/models/user.model';

export type RoomModelDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: [UserSchema] })
  users: User[];

  @Prop({ type: UserSchema })
  createdBy: string;

  @Prop({ type: UserSchema })
  admin: string;

  @Prop({ type: [MessageSchema] })
  messages: Message[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
