import mongoose, { Document, Schema } from 'mongoose';

import { User } from './user.type';


const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const UserModel = mongoose.model<User>('User', userSchema);
