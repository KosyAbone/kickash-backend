const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadToCloud = async (filePath, section = 'IMAGE', resourceType = 'auto') => {
  const result = await cloudinary.v2.uploader.upload(filePath, { folder: `KickAsh/${section}`, resource_type: `${resourceType}` });
  return result;
};

const deleteFromCloud = async (publicID, resourceType) => {
  await cloudinary.v2.uploader.destroy(publicID, {
    resource_type: `${resourceType}`,
  });
  return 'Delete Successful';
};

module.exports = {
    uploadToCloud,
    deleteFromCloud,
};
  