
const Joi = require('joi');
const { isValidAddressJoiHelper } = require('../helper/web3.helper');

const createSTO = {
    body: Joi.object().keys({
        rwaToken: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        stoTokenName: Joi.string().required(),
        stoTokenSymbol: Joi.string().required(),
        initialSupply: Joi.string().required(),
        stoImage: Joi.string().required(),
        country: Joi.string().required(),
        issuer: Joi.string().required(),
        issuanceDate: Joi.string().required(),
        industry: Joi.string().required(),
        companyWebsite: Joi.string().required(),
        description: Joi.string().required(),
    }),
}

const getMySTOs = {
    query: Joi.object().keys({
        address: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const stoDetails = {
    query: Joi.object().keys({
        rwaTokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const featureSTO = {
    body: Joi.object().keys({
        rwaTokenAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        feature: Joi.boolean().required(),
    }),
}

module.exports = {
    createSTO,
    getMySTOs,
    stoDetails,
    featureSTO,
};
