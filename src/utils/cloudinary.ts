/* eslint-disable no-console */
import { promises as fsPromises } from 'fs';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';

// Configure Cloudinary with credentials from the config file
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Function to upload a file to Cloudinary
export const uploadFileToCloudinary = async (
  localPath: string,
  identifier: string,
): Promise<UploadApiResponse | null> => {
  try {
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localPath, {
      public_id: identifier,
      resource_type: 'auto',
    });

    // Delete the local file after successful upload
    await fsPromises.unlink(localPath);

    // Return the Cloudinary upload response
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error uploading file to Cloudinary:', error);

    // Handle the error gracefully, such as deleting the local file
    await fsPromises.unlink(localPath);

    // Return null to indicate an error
    return null;
  }
};
