const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveError } = require('../helpers');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false }
);

userSchema.post('save', handleSaveError);

const registerSchema = Joi.object({
  subscription: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
