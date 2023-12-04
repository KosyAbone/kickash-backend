const cron = require('node-cron');
const DailyLog = require('./src/Models/DailyLogs');
const User = require('./src/Models/User');

// Scheduled job to log daily cigar count
cron.schedule('0 0 * * *', async () => {
  try {
    const users = await User.find();

    users.forEach(async (user) => {
      const today = new Date().toISOString().split('T')[0];

      if (user.noOfCigarPerDay.has(today)) {
        const totalCigars = user.noOfCigarPerDay.get(today);

        // Save the daily log to the DailyLog collection
        await DailyLog.create({
          userId: user._id,
          date: today,
          totalCigars: totalCigars,
        });

        // Clear the daily count after logging
        user.noOfCigarPerDay.delete(today);
        await user.save();
      }
    });
  } catch (error) {
    console.error('Error logging daily cigar count:', error);
  }
});
