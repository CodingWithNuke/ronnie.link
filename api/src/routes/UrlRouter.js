const { Router } = require('express');

const router = Router();

const { UrlController } = require('../controllers')

router.get('/', UrlController.findAll);
router.post('/', UrlController.create);
router.delete('/:id', UrlController.deleteOne);

module.exports = router;