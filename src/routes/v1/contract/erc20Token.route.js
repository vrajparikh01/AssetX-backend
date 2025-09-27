const express = require('express');
const { erc20TokenController } = require('../../../controllers');
const { erc20TokenValidation } = require('../../../validations');
const validate = require('../../../middlewares/validate');
const router = express.Router();

router.get('/balance', validate(erc20TokenValidation.balance), erc20TokenController.balanceOf);
router.get('/decimals', validate(erc20TokenValidation.decimals), erc20TokenController.decimals);
router.get('/stable-coins', erc20TokenController.getSableCoinList);
router.get('/stable-coins/:address', validate(erc20TokenValidation.stableCoin), erc20TokenController.getSableCoinList);

router.post('/approve', validate(erc20TokenValidation.approve), erc20TokenController.approve);
router.post('/transfer', validate(erc20TokenValidation.transfer), erc20TokenController.transfer);

module.exports = router;
