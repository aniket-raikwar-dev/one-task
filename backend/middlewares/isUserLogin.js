const getTokenFromHeader = require("../utils/getTokenFromHeader");
const tokenVerification = require("../utils/tokenVerification");

const isUserLogin = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const decodedUser = tokenVerification(token);
  req.userAuthID = decodedUser.id;
  if (!decodedUser) {
    return next(new Error("You are not logged in!"));
  }

  next();
};

module.exports = isUserLogin;
