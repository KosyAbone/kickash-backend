const User = require('../Models/User');
const DailyLog = require('../Models/DailyLogs');

const incrementCigarCounter = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    const user = await User.findById(userId);

    let currentCigarCount = 0;
    if (user.noOfCigarPerDay.has(today)) {
      currentCigarCount = user.noOfCigarPerDay.get(today) + 1;
      user.noOfCigarPerDay.set(today, currentCigarCount);
    } else {
      currentCigarCount = 1;
      user.noOfCigarPerDay.set(today, 1);
    }

    await user.save();

    res.status(200).json({ message: 'Cigar count incremented successfully', currentCigarCount, success: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error: ' + error.message, success: false });
  }
};

const getSmokingHistory = async (req, res) => {
    try {
      const userId = req.user.id;
      //const { fromDate, toDate } = req.body;
  
      //Get all the logs for the user without date filter
      const history = await DailyLog.find({
        userId: userId,
      }).sort({ date: 'desc' });

      // const history = await DailyLog.find({
      //   userId: userId,
      //   date: { $gte: fromDate, $lte: toDate },
      // }).sort({ date: 'asc' });
  
      res.status(200).json({ history });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error.message });
    }
  };

module.exports = { incrementCigarCounter, getSmokingHistory };
  