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
