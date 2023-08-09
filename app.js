require('dotenv').config();
require('./src/db/connect').connect();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const articleRoutes = require('./src/routes/articleRoutes');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Home Route working');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/articles', articleRoutes);

try{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    })
}catch(error) {
    console.log(error)
};
