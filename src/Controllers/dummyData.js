const DailyLog = require('../Models/DailyLogs');
const mongoose = require('mongoose');
require('dotenv').config();

const sampleData = [
  {
    userId: '656e5f47b4657889b9025abd', // Replace with actual user ID
    date: new Date('2023-11-01'), // Replace with desired dates
    totalCigars: 5,
  },
  {
    userId: '656e5f47b4657889b9025abd',
    date: new Date('2023-11-12'),
    totalCigars: 7,
  },
  {
    userId: '656e5f47b4657889b9025abd',
    date: new Date('2023-11-20'),
    totalCigars: 2,
  },
  // Add more sample data as needed
];

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', async () => {
    try {
        await DailyLog.insertMany(sampleData);
        console.log('Dummy data inserted successfully!');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    } finally {
      // Close the connection after inserting data (optional)
      mongoose.connection.close();
    }
  });