const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Authentication token is missing" });

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Assuming user object has a userId property
    next();
  });
};

module.exports = authenticateJWT;
