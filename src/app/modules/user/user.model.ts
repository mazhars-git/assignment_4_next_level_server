/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import TUserModel, { IUser, IUserMethods } from './user.interface';
import { USER_ROLE } from './user.constant';
import config from '../../config';
import jwt from 'jsonwebtoken';
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
<<<<<<< HEAD
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
=======
// userSchema.pre('save', async function (next) {
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
>>>>>>> 3be8c7d5e842ce820837775741fe6bbf239e1585
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

<<<<<<< HEAD
export const User = model<IUser, TUserModel>('User', userSchema);
=======
// Generate JWT token

userSchema.methods.generateToken = function (): string {
  return jwt.sign(
    {
      email: this.email,
      role: this.role,
    },
    config.jwt_access_secret as string,
    { expiresIn: config.jwt_access_expires_in },
  );
};

const User = model<IUser, TUserModel>('User', userSchema);
export default User;
>>>>>>> 3be8c7d5e842ce820837775741fe6bbf239e1585
