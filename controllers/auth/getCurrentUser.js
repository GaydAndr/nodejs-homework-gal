const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const getCurrentUser = async (req, res) => {
  console.log(1231);

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new RequestError(401, 'Not authorized');
  }
  const { email, subscription, avatarURL } = user;

  res.status(200).json({
    email,
    subscription,
    avatarURL,
  });
};

module.exports = getCurrentUser;
