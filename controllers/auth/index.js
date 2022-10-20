const registed = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendEmail = require('./resendEmail');

module.exports = {
  registed,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  resendEmail,
};
