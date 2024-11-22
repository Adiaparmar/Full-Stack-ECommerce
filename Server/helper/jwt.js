var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_SECRET;
  return jwt({ secret: secret, algorithms: ["HS256"] });
}

module.exports = authJwt;
