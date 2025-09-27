const Joi = require('joi');
const { isValidAddressJoiHelper } = require('../helper/web3.helper');

const listSTO = {
    body: Joi.object().keys({
        stoAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        baseAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        softCap: Joi.string().required(),
        hardCap: Joi.string().required(),
        minInvestment: Joi.string().required(),
        maxInvestment: Joi.string().required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        tokenClaimTime: Joi.string().required(),
        tokenPriceStoToken: Joi.string().required(),
        tokenPriceBaseToken: Joi.string().required(),
        owner: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        image: Joi.string().required(),
        overview: Joi.string().required(),
        companyWebsite: Joi.string().required(),
        issuer: Joi.string().required(),
        country: Joi.string().required(),
        industry: Joi.string().required(),
        investmentType: Joi.string().required(),
    }),
}

const invest = {
    body: Joi.object().keys({
        stoAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        amount: Joi.string().required(),
    }),
}

const claimTokens = {
    body: Joi.object().keys({
        stoAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const claimBaseToken = {
    body: Joi.object().keys({
        stoAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const withdrawBaseToken = {
    body: Joi.object().keys({
        stoAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const withdrawSTOToken = {
    body: Joi.object().keys({
        stoAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const getInvestment = {
    query: Joi.object().keys({
        address: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const getSTOInvestment = {
    query: Joi.object().keys({
        stoAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
        address: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const getSTODetails = {
    query: Joi.object().keys({
        stoAddress: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const getMySTOs = {
    query: Joi.object().keys({
        address: Joi.string().custom(isValidAddressJoiHelper, 'isValidAddress').required(),
    }),
}

const getAllSTO = {
    query: Joi.object().keys({
        country: Joi.string().allow(''),
        industry: Joi.string().allow(''),
        investmentType: Joi.string().allow(''),
        stage: Joi.string().allow(''),
    }),
}

module.exports = {
    listSTO,
    invest,
    claimTokens,
    claimBaseToken,
    withdrawBaseToken,
    withdrawSTOToken,
    getInvestment,
    getSTOInvestment,
    getSTODetails,
    getMySTOs,
    getAllSTO,
};