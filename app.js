const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const sgMail = require('@sendgrid/mail');

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;

// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env

// npm install --save @sendgrid/mail
// // using Twilio SendGrid's v3 Node.js Library
// // https://github.com/sendgrid/sendgrid-nodejs
// javascript
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'galgayand@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
