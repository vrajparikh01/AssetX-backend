const Joi = require('joi');

const uploadJSONToPinata = {
    body: Joi.object().keys({
        data: Joi.object().required(),
    }),
}

const fetchFromPinata = {
    query: Joi.object().keys({
        hash: Joi.string().required(),
    }),
}

module.exports = {
    uploadJSONToPinata,
    fetchFromPinata,
};