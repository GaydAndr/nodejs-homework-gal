const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middleware');
const { schema } = require('../../models/contacts');

const router = express.Router();
router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schema.addSchema), ctrlWrapper(ctrl.addCont));

router.put(
  '/:id',
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

router.patch(
  '/:id/favorite',
  validateBody(schema.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
