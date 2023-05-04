import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Account {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  roleId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: null })
  deletedAt?: Date;
}

export type AccountDocument = HydratedDocument<Account>;

export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.set('timestamps', true);
