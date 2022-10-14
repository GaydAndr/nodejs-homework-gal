const { Contact } = require('../../models/contacts');

const addCont = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
  res.json(result);
};

module.exports = addCont;
