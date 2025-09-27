const express = require('express');
const { stoController } = require('../../../controllers');
const { stoValidation } = require('../../../validations');
const validate = require('../../../middlewares/validate');
const router = express.Router();

router.get('/get-details', validate(stoValidation.stoDetails), stoController.stoDetails);
router.get('/get-country', stoController.getCountry);
router.get('/get-industry', stoController.getIndustry);
router.get('/get-all-sto', stoController.getAllSTO);
router.get('/get-featured-sto', stoController.getFeaturedSTOs);
router.get('/get-my-sto', validate(stoValidation.getMySTOs), stoController.getMySTOs);

router.post('/create', validate(stoValidation.createSTO), stoController.createSTO);

router.patch('/feature', validate(stoValidation.featureSTO), stoController.featureSTO);

module.exports = router;
