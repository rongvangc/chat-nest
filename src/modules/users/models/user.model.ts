import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserModelDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true, trim: true })
  username: string;

  @Prop({ required: true, trim: true })
  displayName: string;

  @Prop()
  photoURL: string;

  @Prop({ required: true, trim: true })
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);