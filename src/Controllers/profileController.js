const User = require('../Models/User');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUserProfile = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Check if the user is trying to update their own profile
      if (userId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden. You are not authorized to update this profile.' });
      }
  
      // Update user profile using the userId
      await User.findByIdAndUpdate(userId, req.body);
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { getUserProfile, updateUserProfile };