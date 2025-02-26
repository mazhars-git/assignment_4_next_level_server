/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import TUserModel, { IUser, IUserMethods } from './user.interface';
import { USER_ROLE } from './user.constant';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, TUserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    id: { type: String, required: false },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
    },
  },
  {
    timestamps: true,
  },
);

// hashing password and save into DB
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set after saving password

userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, TUserModel>('User', userSchema);
