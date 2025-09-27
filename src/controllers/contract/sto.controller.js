const { OK } = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { config } = require('../../config/config');
const { stoFactoryABI } = require('../../utils/contract/abi');
const { getContract } = require('../../utils/contractAggregator');
const { mapData } = require('../../helper/blockchainData.helper');
const { createTransaction } = require('../../helper/transaction.helper');

const createSTO = catchAsync(async (req, res) => {
    const {
        rwaToken,
        stoTokenName,
        stoTokenSymbol,
        initialSupply,
        stoImage,
        country,
        issuer,
        issuanceDate,
        industry,
        companyWebsite,
        description
    } = req.body;
    const contract = getContract(config.contract_address.stoFactory, stoFactoryABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'createSTO',
        args: [
            rwaToken,
            stoTokenName,
            stoTokenSymbol,
            initialSupply,
            stoImage,
            country,
            issuer,
            issuanceDate,
            industry,
            companyWebsite,
            description
        ],
        to: config.contract_address.stoFactory,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for createSTO',
        data: txParams,
    });
});

const getCountry = catchAsync(async (req, res) => {
    const contract = getContract(config.contract_address.stoFactory, stoFactoryABI);
    const country = await contract.getValidCountries();
    res.status(OK).json({
        success: true,
        message: 'Country fetched successfully',
        data: country,
    });
})

const getIndustry = catchAsync(async (req, res) => {
    const contract = getContract(config.contract_address.stoFactory, stoFactoryABI);
    const industry = await contract.getValidIndustries();
    res.status(OK).json({
        success: true,
        message: 'Industry fetched successfully',
        data: industry,
    });
})

const getAllSTO = catchAsync(async (req, res) => {
    const { country, industry } = req.query;

    const contract = getContract(config.contract_address.stoFactory, stoFactoryABI);
    const allSTO = await contract.getAllSTOs();
    let mapAllSTO = mapData(stoFactoryABI, 'getAllSTOs', allSTO);

    mapAllSTO = mapAllSTO.filter((sto) => {
        return (country ? sto.country === country : true) && (industry ? sto.industry === industry : true);
    })


    res.status(OK).json({
        success: true,
        message: 'All STO fetched successfully',
        data: mapAllSTO,
    });
})

const getFeaturedSTOs = catchAsync(async (req, res) => {
    const contract = getContract(config.contract_address.stoFactory, stoFactoryABI);
    const featuredSTOs = await contract.getFeaturedSTOs();
    const mapFeaturedSTOs = mapData(stoFactoryABI, 'getFeaturedSTOs', featuredSTOs);

    res.status(OK).json({
        success: true,
        message: 'Featured STOs fetched successfully',
        data: mapFeaturedSTOs,
    });
})

const getMySTOs = catchAsync(async (req, res) => {
    const { address } = req.query;

    const contract = getContract(config.contract_address.stoFactory, stoFactoryABI);
    const mySTOs = await contract.getSTOsByOwner(address);
    const mapMySTOs = mapData(stoFactoryABI, 'getSTOsByOwner', mySTOs);

    mapMySTOs.forEach((sto) => {
        sto.decimals = 18;
    })

    res.status(OK).json({
        success: true,
        message: 'My STOs fetched successfully',
        data: mapMySTOs,
    });
})

const stoDetails = catchAsync(async (req, res) => {
    const { rwaTokenAddress } = req.query;

    const contract = getContract(config.contract_address.stoFactory, stoFactoryABI);
    const stoDetails = await contract.getSTOInfo(rwaTokenAddress);
    const mapStoDetails = mapData(stoFactoryABI, 'getSTOInfo', stoDetails);

    res.status(OK).json({
        success: true,
        message: 'Details fetched successfully',
        data: mapStoDetails,
    });
});

const featureSTO = catchAsync(async (req, res) => {
    const { rwaTokenAddress, feature } = req.body;

    const contract = getContract(config.contract_address.stoFactory, stoFactoryABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'changeSTOFeatureStatus',
        args: [
            rwaTokenAddress,
            feature
        ],
        to: config.contract_address.stoFactory,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for featureSTO',
        data: txParams,
    });
})

module.exports = {
    createSTO,
    getCountry,
    getIndustry,
    getAllSTO,
    getFeaturedSTOs,
    getMySTOs,
    stoDetails,
    featureSTO
};
