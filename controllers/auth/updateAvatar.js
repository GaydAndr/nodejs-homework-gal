const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { User } = require('../../models/user');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: temUpload, originalname } = req.file;
    const extention = originalname.split('.').pop();
    const fileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarDir, fileName);
    await fs.rename(temUpload, resultUpload);

    Jimp.read(resultUpload, async (err, avatar) => {
      if (err) throw err;
      await avatar
        .resize(256, 256) // resize
        .write(resultUpload); // save
    });

    const avatarURL = path.join('avatar', fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    console.log(123);

    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
