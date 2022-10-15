const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middleware');
const { schema } = require('../../models/contacts');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:id', authenticate, ctrlWrapper(ctrl.getContactById));

router.post(
  '/',
  authenticate,
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.addCont)
);

router.put(
  '/:id',
  authenticate,
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.delete('/:id', authenticate, ctrlWrapper(ctrl.removeContact));

router.patch(
  '/:id/favorite',
  authenticate,
  validateBody(schema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
