const express = require('express');
const { signTransactionController } = require('../../controllers');
const { signTransactionValidation } = require('../../validations');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.post('/', validate(signTransactionValidation.signTransaction), signTransactionController.signTransaction);

module.exports = router;
