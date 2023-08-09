require('dotenv').config();
require('./db/connect').connect();
const express = require('express');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
