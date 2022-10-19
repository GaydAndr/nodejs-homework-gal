const { BASE_URL } = process.env;

const createVerifyEmail = (to, verificationToken) => {
  const mail = {
    to,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Haжмите для подтверждения регистрации</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
