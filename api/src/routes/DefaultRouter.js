const { Router } = require('express');

const router = Router();

const { DefaultController } = require('../controllers')

router.get('/:slug', DefaultController.findOne);

module.exports = router;