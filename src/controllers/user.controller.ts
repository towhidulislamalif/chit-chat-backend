import APIError from '../error/APIError';
import User from '../models/user.model';
import { asyncRequestHandler } from '../utils/asyncRequestHandler';
import { uploadFileToCloudinary } from '../utils/cloudinary';
import { sendAPIResponse } from '../utils/sendAPIResponse';

export const registerUser = asyncRequestHandler(async (req, res) => {
  const { first_name, last_name, email, password, date_of_birth, gender, profile_picture } =
    req.body;

  // Validate required fields
  if (!first_name || !last_name || !email || !password || !date_of_birth || !gender) {
    throw new APIError(400, 'All fields are required');
  }

  // Check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    throw new APIError(409, 'User already registered');
  }

  // Handle profile picture upload to Cloudinary
  const localPicturePath = req.file?.path;
  const identifier = `${first_name}-${last_name}`.toLowerCase();
  let profileImg = profile_picture;

  if (localPicturePath) {
    const image = await uploadFileToCloudinary(localPicturePath, identifier);
    profileImg = image?.url;
  }

  const createdUser = await User.create({
    first_name,
    last_name,
    email,
    password,
    date_of_birth,
    gender,
    profile_picture: profileImg,
  });
  const new_user = await User.findById(createdUser._id).select('-password');

  // Send API response
  sendAPIResponse(res, {
    success: true,
    status: 201,
    message: 'User registration successful',
    data: new_user,
  });
});
