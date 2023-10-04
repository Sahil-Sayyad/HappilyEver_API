const jwt = require('jsonwebtoken');

// Middleware function for JWT token verification
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  let token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. No token provided.' });
  }
  
  // Verify the token
  token = token.split(" ")[1];
  jwt.verify(token, process.env.jwtSecretKey, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
    // Attach the decoded user information to the request object
    req.userId = decoded.userId;
    next(); // Move to the next middleware or route handler
  });
};

module.exports = verifyToken;
