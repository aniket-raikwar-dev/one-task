const jwt = require("jsonwebtoken");

const tokenVerification = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return false;
    return decoded;
  });
};

module.exports = tokenVerification;
