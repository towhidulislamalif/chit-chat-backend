/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

// Interface for user data
export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  avatar: string;
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export type UserModel = mongoose.Model<IUser, Record<string, unknown>, IUserMethods>;
