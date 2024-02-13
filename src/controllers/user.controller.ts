import config from '../config';
import APIError from '../error/APIError';
import User from '../models/user.model';
import { asyncRequestHandler } from '../utils/asyncRequestHandler';
import { uploadFileToCloudinary } from '../utils/cloudinary';
import { sendAPIResponse } from '../utils/sendAPIResponse';

export const registerUser = asyncRequestHandler(async (req, res) => {
  const { firstname, lastname, email, password, dateOfBirth, gender, avatar } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email || !password || !dateOfBirth || !gender) {
    throw new APIError(400, 'All fields are required');
  }

  // Check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    throw new APIError(409, 'User already registered');
  }

  // Handle profile picture upload to Cloudinary
  const imageFilePath = req.file?.path;
  const identifier = `${firstname}-${lastname}`.toLowerCase();
  let profileImage = avatar;

  if (imageFilePath) {
    const uploadedImage = await uploadFileToCloudinary(imageFilePath, identifier);
    profileImage = uploadedImage?.url;
  }

  // Create a new user
  const createdUser = await User.create({
    firstname,
    lastname,
    email,
    password,
    dateOfBirth,
    gender,
    avatar: profileImage,
  });

  // Fetch the created user excluding the password field
  const newUser = await User.findById(createdUser._id).select('-password');

  // Send API response
  sendAPIResponse(res, {
    success: true,
    status: 201,
    message: 'User registration successful',
    data: newUser,
  });
});

export const loginUser = asyncRequestHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    throw new APIError(400, 'All fields are required');
  }

  // Check if the user already exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError(404, 'User not found');
  }

  // compare the password
  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) {
    throw new APIError(400, 'Invalid password');
  }

  const access_token = user.generateAccessToken();
  const refresh_token = user.generateRefreshToken();

  res.cookie('refresh_token', refresh_token, {
    httpOnly: true,
    secure: config.node_env === 'production',
  });

  sendAPIResponse(res, {
    success: true,
    status: 200,
    message: 'User login successfully',
    data: { access_token },
  });
});
