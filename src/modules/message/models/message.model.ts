import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageModelDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true, trim: true })
  roomId: string;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  senderId: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'MessageRecipient' }],
    default: [],
  })
  recipientIds: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
