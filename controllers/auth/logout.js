const { User } = require('../../models/user');

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate({ id: _id }, { token: '' }, { new: true });
  res.status(204).json({
    message: 'Logout success',
  });
};

module.exports = logout;
