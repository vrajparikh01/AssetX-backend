const Joi = require('joi');
const { isValidAddressJoiHelper } = require('../helper/web3.helper');

const balance = {
    query: Joi.object().keys({
        address: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        tokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const decimals = {
    query: Joi.object().keys({
        tokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const approve = {
    body: Joi.object().keys({
        tokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        spender: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        amount: Joi.string().required(),
    }),
}

const transfer = {
    body: Joi.object().keys({
        tokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        to: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        amount: Joi.number().required(),
    }),
}

const stableCoin = {
    params: Joi.object().keys({
        address: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

module.exports = {
    balance,
    decimals,
    approve,
    transfer,
    stableCoin
};
