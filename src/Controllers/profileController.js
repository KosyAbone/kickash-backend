const User = require('../Models/User');
const { uploadToCloud, deleteFromCloud } = require('../config/cloudinary');

// Fetch user profile details
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden. You are not authorized to update this profile.' });
    }
    const user = await User.findById(userId).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error: ' + error.message  });
  }
};

// Update user profile details
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden. You are not authorized to update this profile.' });
    }

    // Find user by ID and update with data from req.body
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body }, // Use $set to update only specified fields from req.body
      { new: true } // To return the updated document
    ).select('-password'); // To exclude the password field from the returned document

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', success: true, user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error.message, success: false });
  }
};

// Upload profile picture for a user
const uploadProfilePicture = async (req, res) => {
  let profileImageUrl = '';
  try {
    const userId = req.params.userId;
    if (userId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden. You are not authorized to update this profile.' });
    }

    const user = await User.findById(userId).select('-password');

    // If a file is uploaded, upload it to Cloudinary and update user profile picture
    if (req.file) {
      const cloudinaryResult = await uploadToCloud(req.file.path, 'PROFILE', 'image');

      if (user.profilePicture.publicId) {
        await deleteFromCloud(user.profilePicture.publicId, 'image');
      }

      user.profilePicture = {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
      };
    }
    await user.save();
    profileImageUrl = user.profilePicture.url;
    res.status(200).json({ message: 'Profile picture updated successfully', profileImageUrl, success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error.message, success: false });
  }
};

module.exports = { getUserProfile, updateUserProfile, uploadProfilePicture };
