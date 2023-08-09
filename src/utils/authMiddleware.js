const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  const token = bearerToken.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Please Authenticate. Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token. Access denied.' });
  }
};

module.exports = authenticateToken;