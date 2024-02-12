import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IUser, IUserMethods, UserModel } from '../interface/user.interface';

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, 'First name is required'],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Email address is required'],
      validate: {
        validator: (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
        message: 'Please enter a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: {
        validator: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
        message:
          'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one digit.',
      },
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
      validate: {
        validator: (value: string) =>
          /^(0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])[-/](19|20)\d\d$/.test(value),
        message: 'Please enter a valid date of birth in MM/DD/YYYY format',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'Gender must be either "male" or "female"',
      },
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/touhidul/image/upload/cqm1lxzl94txu7me5zux.jpg',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Pre-save hook for password hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method for comparing passwords
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Method for generating access token
userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    },
    config.access_token_secret as string,
    {
      expiresIn: config.access_token_expiry,
    },
  );
};

// Method for generating refresh token
userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.refresh_token_secret as string,
    {
      expiresIn: config.refresh_token_expiry,
    },
  );
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
