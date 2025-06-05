const { validateToken } = require("../services/auth");

function checkForAuthcookie(cookiename) {
  return (req, res, next) => {
    const tokencookievalue = req.cookies[cookiename];
    if (!tokencookievalue) {
      return next();
    }
    try {
      const payload = validateToken(tokencookievalue);
      req.user = payload;
    } catch (error) {}
    return next();
  };
}
module.exports = { checkForAuthcookie };
