const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalCigars: {
    type: Number,
    required: true,
  },
});

const DailyLog = mongoose.model('DailyLog', dailyLogSchema);

module.exports = DailyLog;
