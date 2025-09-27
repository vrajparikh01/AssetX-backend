
const Joi = require('joi');
const { isValidAddressJoiHelper } = require('../helper/web3.helper');

const createPair = {
    body: Joi.object().keys({
        stoTokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        tokenB: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const addLiquidity = {
    body: Joi.object().keys({
        tokenA: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        tokenB: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        amountADesired: Joi.string().required(),
        amountBDesired: Joi.string().required(),
        amountAMin: Joi.string().required(),
        amountBMin: Joi.string().required(),
        deadline: Joi.number().required(),
    }),
}

const getAmountsOut = {
    params: Joi.object().keys({
        amountIn: Joi.string().required(),
        tokenA: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        tokenB: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const swapExactTokensForTokens = {
    body: Joi.object().keys({
        amountIn: Joi.string().required(),
        amountOutMin: Joi.string().required(),
        tokenA: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        tokenB: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        to: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const getPair = {
    query: Joi.object().keys({
        tokenA: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        tokenB: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    })
}

module.exports = {
    createPair,
    addLiquidity,
    getAmountsOut,
    swapExactTokensForTokens,
    getPair
};
