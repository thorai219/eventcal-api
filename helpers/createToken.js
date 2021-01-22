const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

// generate signed jwt from user data
const createToken = (user) => {
  let paylaod = {
    username: user.username,
  };

  return jwt.sign(payload, SECRET);
};

module.exports = createToken;
