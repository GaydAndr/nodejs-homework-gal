const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { subscription = 'starter', email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new RequestError(409, 'Email in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    subscription,
    email,
    password: hashPassword,
  });
  res.status(201).json({
    subscription: result.subscription,
    email: result.email,
  });
};

module.exports = register;
