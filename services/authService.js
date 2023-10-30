const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };
