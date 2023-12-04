const User = require('../Models/User');
const DailyLog = require('../Models/DailyLogs');

const incrementCigarCounter = async (req, res) => {
    try {
      const userId = req.user.id;
      const today = new Date().toISOString().split('T')[0];
  
      const user = await User.findById(userId);
  
      if (user.noOfCigarPerDay.has(today)) {
        user.noOfCigarPerDay.set(today, user.noOfCigarPerDay.get(today) + 1);
      } else {
        user.noOfCigarPerDay.set(today, 1);
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Cigar count incremented successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error.message });
    }
  };

const getSmokingHistory = async (req, res) => {
    try {
      const userId = req.user.id;
      const { fromDate, toDate } = req.query;
  
      // Assuming you have a DailyLog model for storing daily logs
      const history = await DailyLog.find({
        userId: userId,
        date: { $gte: fromDate, $lte: toDate },
      }).sort({ date: 'asc' });
  
      res.status(200).json({ history });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error.message });
    }
  };

module.exports = { incrementCigarCounter, getSmokingHistory };
  