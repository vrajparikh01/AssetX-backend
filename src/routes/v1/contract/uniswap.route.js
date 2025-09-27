const express = require('express');
const { uniswapController } = require('../../../controllers');
const { uniswapValidation } = require('../../../validations');
const validate = require('../../../middlewares/validate');
const router = express.Router();

router.get('/get-amounts-out/:tokenA/:tokenB/:amountIn', validate(uniswapValidation.getAmountsOut), uniswapController.getAmountsOut);
router.get('/get-pair', validate(uniswapValidation.getPair), uniswapController.getPair);

router.post('/create-pair', validate(uniswapValidation.createPair), uniswapController.createPair);
router.post('/add-liquidity', validate(uniswapValidation.addLiquidity), uniswapController.addLiquidity);
router.post('/swap-tokens', validate(uniswapValidation.swapExactTokensForTokens), uniswapController.swapExactTokensForTokens);

module.exports = router;
