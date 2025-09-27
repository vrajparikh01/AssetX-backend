const express = require('express');
const { launchpadController } = require('../../../controllers');
const { launchpadValidation } = require('../../../validations');
const validate = require('../../../middlewares/validate');
const router = express.Router();

router.get('/get-investment', validate(launchpadValidation.getInvestment), launchpadController.getInvestment);
router.get('/get-sto-investment', validate(launchpadValidation.getSTOInvestment), launchpadController.getSTOInvestment);
router.get('/get-sto-details', validate(launchpadValidation.getSTODetails), launchpadController.getSTODetails);
router.get('/get-country', launchpadController.getCountry);
router.get('/get-industry', launchpadController.getIndustry);
router.get('/get-investment-type', launchpadController.getInvestmentType);
router.get('/get-stage', launchpadController.getStage);
router.get('/get-all-sto', validate(launchpadValidation.getAllSTO), launchpadController.getAllSTO);
router.get('/get-my-sto', validate(launchpadValidation.getMySTOs), launchpadController.getMySTOs);

router.post('/list-sto', validate(launchpadValidation.listSTO), launchpadController.listSTO);
router.post('/invest', validate(launchpadValidation.invest), launchpadController.invest);
router.post('/claim-tokens', validate(launchpadValidation.claimTokens), launchpadController.claimTokens);
router.post('/claim-base-token', validate(launchpadValidation.claimBaseToken), launchpadController.claimBaseToken);
router.post('/withdraw-base-token', validate(launchpadValidation.withdrawBaseToken), launchpadController.withdrawBaseToken);
router.post('/withdraw-sto-token', validate(launchpadValidation.withdrawSTOToken), launchpadController.withdrawSTOToken);

module.exports = router;
