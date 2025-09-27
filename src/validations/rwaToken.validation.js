const Joi = require('joi');
const { isValidAddressJoiHelper } = require('../helper/web3.helper');

const balance = {
    query: Joi.object().keys({
        address: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        rwaTokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const details = {
    query: Joi.object().keys({
        rwaTokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const approve = {
    body: Joi.object().keys({
        rwaTokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        spender: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        amount: Joi.string().required(),
    }),
}

const transfer = {
    body: Joi.object().keys({
        rwaTokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        to: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        amount: Joi.string().required(),
    }),
}

module.exports = {
    balance,
    details,
    approve,
    transfer,
};
