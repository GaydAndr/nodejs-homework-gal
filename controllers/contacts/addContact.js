const { Contact } = require('../../models/contacts');

const addCont = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
  res.json(result);
};

module.exports = addCont;
