const UserService = require('../services/user-service');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    const payload = UserService.verifyToken(token);
    req.user = {
      id: payload.id,
      email: payload.email,
      profilePhoto: payload.profilePhoto
    };
    next();
  } catch(error) {
    error.status = 418;
    next(error);
  }
};
