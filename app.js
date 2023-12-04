require('dotenv').config();
require('./src/db/connect').connect();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const articleRoutes = require('./src/routes/articleRoutes');
const cigarRoutes = require('./src/routes/cigarRoutes');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Home Route working');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/smoke', cigarRoutes);
app.use('/articles', articleRoutes);

try{
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    })
}catch(error) {
    console.log(error)
};
