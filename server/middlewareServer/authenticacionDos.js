const jwt = require('jsonwebtoken');
const config = {
  authSecret:process.env.TOK_AUTH, // secret for generating jwt token
}
const isAuthenticated = function (req, res, next) {
  var token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret,(err, decoded)=>{
      if (err) {
        return res.json({
          success: false,
          message: 'unauthorized',
          status:205
        })
      }
      if(decoded) {
        next();
      }
    });
  }else{
    return res.json({
      success: false,
      message: 'unauthorized',
      status:205
    })
  }
}
module.exports = isAuthenticated
