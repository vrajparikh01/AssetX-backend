const express = require('express');
const { rwaTokenController } = require('../../../controllers');
const { rwaTokenValidation } = require('../../../validations');
const validate = require('../../../middlewares/validate');
const router = express.Router();

router.get('/balance', validate(rwaTokenValidation.balance), rwaTokenController.balanceOf);
router.get('/details', validate(rwaTokenValidation.details), rwaTokenController.details);

router.post('/approve', validate(rwaTokenValidation.approve), rwaTokenController.approve);
router.post('/transfer', validate(rwaTokenValidation.transfer), rwaTokenController.transfer);

module.exports = router;
