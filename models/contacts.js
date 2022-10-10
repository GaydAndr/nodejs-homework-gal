const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const filereadCintact = contacts.find(({ id }) => id === contactId);
  return filereadCintact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactDelete = contacts.filter((el) => el.id !== contactId);
  if (contactDelete.lenght === 0) {
    return { message: 'Not found' };
  }
  await fs.writeFile(contactsPath, JSON.stringify(contactDelete));
  return { message: 'Contact deleted' };
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const contactIds = contacts.map((item) => +item.id);
  const newContact = {
    id: String(Math.max(...contactIds) + 1),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactsIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactsIndex === -1) {
    return { message: 'Not found' };
  }
  contacts[contactsIndex] = { id: contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[contactsIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
