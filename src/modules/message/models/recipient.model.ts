import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserSchema } from 'src/modules/users/models/user.model';
import { MessageSchema } from './message.model';

export type MessageRecipientModelDocument = HydratedDocument<MessageRecipient>;

@Schema()
export class MessageRecipient {
  @Prop({ type: MessageSchema })
  messageId: string;

  @Prop({ type: UserSchema })
  recipientId: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageRecipientSchema =
  SchemaFactory.createForClass(MessageRecipient);
