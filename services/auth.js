const jwt = require("jsonwebtoken");
const user = require("../models/user");

const secret = "$arh123@";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profile: user.profile,
    role: user.role
  };
  const token = jwt.sign(payload, secret);
  return token;
}
function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}
module.exports = { createTokenForUser, validateToken };
