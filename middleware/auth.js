const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

// middleware to use when a user must provide a valid token
// add username to token as a convenience for view functions
const authRequired = (req, res, next) => {
  try {
    const tokenStr = req.body._token || req.query._token;
    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;
    return next();
  } catch (err) {
    let unAuthorized = new Error("You must login first!");
    unAuthorized.status = 401;
    return next(unAuthorized);
  }
};

// middleware to user when a user must provide a valid token && be user matching

const correctUser = (req, res, next) => {
  try {
    const tokenStr = req.body._token || req.query._token;
    let token = jwt.verify(tokenStr, SECRET);
    req.username = token.username;

    if (token.username === req.params.username) {
      return next();
    }

    // throw an error, so we catch it in our catch block
    throw new Error();
  } catch (err) {
    const unauthorized = new Error("You are not authorized!");
    unauthorized.status = 401;

    return next(unauthorized);
  }
};

module.exports = {
  authRequired,
  correctUser,
};
