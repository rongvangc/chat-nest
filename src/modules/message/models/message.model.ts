import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User, UserSchema } from 'src/modules/users/models/user.model';
import { MessageRecipient, MessageRecipientSchema } from './recipient.model';

export type MessageModelDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ type: UserSchema })
  sender: User;

  @Prop({ type: [MessageRecipientSchema] })
  recipients: MessageRecipient[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
