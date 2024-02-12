/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

// Interface for user data
export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  profile_picture: string;
}

export interface IUserMethods {
  passwordCompare: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export type UserModel = mongoose.Model<IUser, Record<string, unknown>, IUserMethods>;
