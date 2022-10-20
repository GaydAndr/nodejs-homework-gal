const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });

  if (!result) {
    throw new RequestError(401, 'Email or Password is wrong');
  }

  if (!result.verificationToken) {
    throw new RequestError(401, 'Email not verify');
  }

  const checkPass = await bcrypt.compare(password, result.password);

  if (!checkPass) {
    throw new RequestError(401, 'Email or Password is wrong');
  }

  const token = jwt.sign({ id: result._id }, SECRET_KEY, { expiresIn: '1h' });

  const updatedUser = await User.findOneAndUpdate(
    { _id: result._id },
    { token },
    { new: true }
  );

  res.json({
    token: updatedUser.token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = login;
