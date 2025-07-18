import { UserType } from "../types/user.types";
import { Schema } from 'mongoose';
import connection from '../db';



const userSchema = new Schema<UserType>({
  store: {
    type: Number,
  },
  id: { type: Number },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastCreatedUser = await userModel.findOne().sort({ id: -1 });
    this.id = lastCreatedUser ? lastCreatedUser.id + 1 : 1;
  }
  next();
});

// // @ts-ignore
// import Inc from "mongoose-sequence";
// const AutoIncrement = Inc(mongoose); 


// userSchema.plugin(AutoIncrement, { inc_field: 'id' });

export const userModel = connection.model<UserType>('User', userSchema);