import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageCountModelDocument = HydratedDocument<MessageCount>;

@Schema()
export class MessageCount {
  @Prop({ required: true, trim: true })
  roomId: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true, default: 0 })
  messageCount: number;
}

export const MessageCountSchema = SchemaFactory.createForClass(MessageCount);
