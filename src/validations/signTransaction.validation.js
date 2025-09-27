const Joi = require('joi');

const signTransaction = {
    body: Joi.object().keys({
        txParams: Joi.object().required(),
    }),
}

module.exports = {
    signTransaction
};
