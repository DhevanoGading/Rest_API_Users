const { sign, verify } = require("jsonwebtoken");
const KEY = "jwtuserlogin";

const generateTokens = (user) => {
  const accessToken = sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    KEY
  );
  return accessToken;
};

const validateToken = (requiredRole) => (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Autenticated!" });

  try {
    const validToken = verify(accessToken, KEY);
    if (validToken) {
      req.authenticated = true;
      if (requiredRole && requiredRole !== validToken.role) {
        return res.status(400).json({ error: "Unauthorized access!" });
      }
      req.user = validToken;
      return next();
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { generateTokens, validateToken };
