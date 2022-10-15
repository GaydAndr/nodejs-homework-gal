const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contacts');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = removeContact;
