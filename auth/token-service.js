const jwt = require("jsonwebtoken"); // installed this library

const secrets = require("../config/secrets.js");

module.exports = {
  generateToken,
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    roles: ["User"],
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
