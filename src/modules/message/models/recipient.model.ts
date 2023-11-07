import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageRecipientModelDocument = HydratedDocument<MessageRecipient>;

@Schema()
export class MessageRecipient {
  @Prop({ type: Types.ObjectId, ref: 'Message' })
  messageId: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  recipientId: string;

  @Prop({ default: false })
  isRead: boolean;
}

export const MessageRecipientSchema =
  SchemaFactory.createForClass(MessageRecipient);
