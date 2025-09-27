const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const constant = require('./constant');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid(constant.DEV_NODE_ENV, constant.STAGING_NODE_ENV, constant.PROD_NODE_ENV).required(),
        SSL_PRIVATE_KEY: Joi.string().allow(''),
        SSL_FULLCHAIN_KEY: Joi.string().allow(''),
        // if node env is prod, then AWS_REGION & AWS_SECRET_NAME is required
        AWS_REGION: Joi.string().when('NODE_ENV', {
            is: constant.PROD_NODE_ENV,
            then: Joi.required(),
            otherwise: Joi.allow('')
        }),
        AWS_SECRET_NAME: Joi.string().when('NODE_ENV', {
            is: constant.PROD_NODE_ENV,
            then: Joi.required(),
            otherwise: Joi.allow('')
        }),
        PORT: Joi.number().default(3000),
        PRIVATE_KEY: Joi.string().description('private key for wallet'),
        RPC_URI: Joi.string().required().description('rpc uri for connection'),
        USDC_TOKEN_CONTRACT_ADDRESS: Joi.string().required().description('USDC contract address'),
        STO_FACTORY_CONTRACT_ADDRESS: Joi.string().required().description('STO factory contract address'),
        UNISWAP_V2_PAIR_CONTRACT_ADDRESS: Joi.string().required().description('Uniswap V2 pair contract address'),
        UNISWAP_V2_ROUTER02_CONTRACT_ADDRESS: Joi.string().required().description('Uniswap V2 router02 contract address'),
        UNISWAP_V2_FACTORY_CONTRACT_ADDRESS: Joi.string().required().description('Uniswap V2 factory contract address'),
        LAUNCHPAD_CONTRACT_ADDRESS: Joi.string().required().description('Launchpad contract address'),
        EXPLORER_URL: Joi.string().required().description('explorer url'),
        PINNATA_API_KEY: Joi.string().description('pinnata api key'),
        PINNATA_SECRET_KEY: Joi.string().description('pinnata secret api key'),
        PINNATA_API_BASE_URL: Joi.string().description('pinnata api base url'),
        PINNATA_GATEWAY_BASE_URL: Joi.string().description('pinnata gateway base url'),
        PINNATA_GATEWAY_TOKEN: Joi.string().description('pinnata gateway token'),
    })
    .unknown();

const validateConfig = () => {
    const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
    return envVars;
}

const config = {
    get env() {
        return process.env.NODE_ENV;
    },
    get ssl() {
        return {
            privateKey: process.env.SSL_PRIVATE_KEY,
            fullChainKey: process.env.SSL_FULLCHAIN_KEY
        }
    },
    get aws() {
        return {
            secret_name: process.env.AWS_SECRET_NAME,
            region: process.env.AWS_REGION
        }
    },
    get port() {
        return process.env.PORT;
    },
    get private_key() {
        return process.env.PRIVATE_KEY
    },
    get rpc_uri() {
        return process.env.RPC_URI
    },
    get contract_address() {
        return {
            usdcToken: process.env.USDC_TOKEN_CONTRACT_ADDRESS,
            stoFactory: process.env.STO_FACTORY_CONTRACT_ADDRESS,
            uniswapV2Pair: process.env.UNISWAP_V2_PAIR_CONTRACT_ADDRESS,
            uniswapV2Router02: process.env.UNISWAP_V2_ROUTER02_CONTRACT_ADDRESS,
            uniswapV2Factory: process.env.UNISWAP_V2_FACTORY_CONTRACT_ADDRESS,
            launchpad: process.env.LAUNCHPAD_CONTRACT_ADDRESS
        }
    },
    get explorer_url() {
        return process.env.EXPLORER_URL
    },
    get mongoose() {
        return {
            url: process.env.MONGODB_URL,
        };
    },
    get pinata() {
        return {
            api_key: process.env.PINATA_API_KEY,
            secret_key: process.env.PINATA_SECRET_KEY,
            api_base_url: process.env.PINATA_API_BASE_URL,
            gateway_base_url: process.env.PINATA_GATEWAY_BASE_URL,
            gateway_token: process.env.PINATA_GATEWAY_TOKEN,
            group_id: process.env.PINATA_GROUP_ID
        }
    }
};

module.exports = {
    config,
    validateConfig
};
