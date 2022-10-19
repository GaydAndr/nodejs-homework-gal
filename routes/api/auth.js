const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middleware');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post(
  '/signup',
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.registed)
);

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get('/varify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post(
  '/varify',
  validateBody(schemas.emailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrentUser));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatarURL'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
