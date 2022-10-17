const isConflict = ({ name, code }) =>
  name === 'MangoServerError' && code === 11000;

const handleSaveError = (error, _, next) => {
  console.log(error.name);
  console.log(error.code);
  error.status = isConflict(error) ? 409 : 400;
  next();
};

module.exports = handleSaveError;
