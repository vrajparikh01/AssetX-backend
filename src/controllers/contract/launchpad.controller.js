const { OK } = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { launchpadABI } = require('../../utils/contract/abi');
const { serializeBigInt, mapData } = require('../../helper/blockchainData.helper');
const { getContract } = require('../../utils/contractAggregator');
const { createTransaction } = require('../../helper/transaction.helper');
const { config } = require('../../config/config');
const { pinataService } = require('../../services');
const launchpadStoStage = require('../../config/launchpadStoStage');

const listSTO = catchAsync(async (req, res) => {
    const {
        stoAddress,
        baseAddress,
        softCap,
        hardCap,
        minInvestment,
        maxInvestment,
        startTime,
        endTime,
        tokenClaimTime,
        tokenPriceStoToken,
        tokenPriceBaseToken,
        owner,
        image,
        overview,
        companyWebsite,
        issuer,
        country,
        industry,
        investmentType,
    } = req.body;
    const stoDetail = {
        stoToken: stoAddress,
        baseToken: baseAddress,
        softCap,
        hardCap,
        minInvestment,
        maxInvestment,
        startTime,
        endTime,
        tokenClaimTime,
        tokenPriceStoToken,
        tokenPriceBaseToken,
        owner,
        raisedAmount: 0,
    };
    const stoInfo = {
        overview,
        image,
        companyWebsite,
        issuer,
        country,
        industry,
        investmentType,
    };

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'listSTO',
        args: [stoDetail, stoInfo],
        to: config.contract_address.launchpad,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for listSTO',
        data: txParams,
    });
});

const invest = catchAsync(async (req, res) => {
    const { stoAddress, amount } = req.body;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'invest',
        args: [stoAddress, amount],
        to: config.contract_address.launchpad,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for invest',
        data: txParams,
    });
});

const claimTokens = catchAsync(async (req, res) => {
    const { stoAddress } = req.body;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'claimTokens',
        args: [stoAddress],
        to: config.contract_address.launchpad,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for claimTokens',
        data: txParams,
    });
})

const claimBaseToken = catchAsync(async (req, res) => {
    const { stoAddress } = req.body;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'claimBaseToken',
        args: [stoAddress],
        to: config.contract_address.launchpad,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for claimBaseToken',
        data: txParams,
    });
});

const withdrawBaseToken = catchAsync(async (req, res) => {
    const { stoAddress } = req.body;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'withdrawBaseToken',
        args: [stoAddress],
        to: config.contract_address.launchpad,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for withdrawBaseToken',
        data: txParams,
    });
});

const withdrawSTOToken = catchAsync(async (req, res) => {
    const { stoAddress } = req.body;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'withdrawSTOToken',
        args: [stoAddress],
        to: config.contract_address.launchpad,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for withdrawSTOToken',
        data: txParams,
    });
});

const getInvestment = catchAsync(async (req, res) => {
    const { address } = req.query;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const data = await contract.getInvestment(address);
    const mappedData = mapData(launchpadABI, 'getInvestment', data);

    res.status(OK).json({
        success: true,
        message: 'Investment fetched successfully',
        data: mappedData,
    });
});

const getSTOInvestment = catchAsync(async (req, res) => {
    const { stoAddress, address } = req.query;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const data = await contract.investments(address, stoAddress);
    const serializeBigIntData = serializeBigInt(data);

    res.status(OK).json({
        success: true,
        message: 'STO Investment fetched successfully',
        data: serializeBigIntData,
    });
})

const getSTODetails = catchAsync(async (req, res) => {
    const { stoAddress } = req.query;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const data = await contract.listings(stoAddress)
    let mappedData = mapData(launchpadABI, 'listings', data);

    const investorCount = await contract.investorCount(stoAddress);
    mappedData.investorCount = serializeBigInt(investorCount);

    const isClaimedRaisedFund = await contract.isClaimedRaisedFund(stoAddress);
    mappedData.isClaimedRaisedFund = isClaimedRaisedFund;

    const details = await contract.details(stoAddress);
    mappedData.details = mapData(launchpadABI, 'details', details);

    const overview = await pinataService.fetchFromPinata(mappedData.details.overview);
    mappedData.details.overview = overview.overview;
    mappedData.details.title = overview.title;
    const curTimestamp = Math.floor(new Date().getTime()/1000);

    if(mappedData.endTime > curTimestamp && mappedData.startTime < curTimestamp) {
        mappedData.stage = 'public_sale';
    }
    else if(mappedData.startTime > curTimestamp) {
        mappedData.stage = 'coming_soon';
    }
    else if(mappedData.endTime < curTimestamp && mappedData.tokenClaimTime > curTimestamp) {
        mappedData.stage = 'closed';
    }
    else if(mappedData.tokenClaimTime < curTimestamp && mappedData.raisedAmount > mappedData.softCap) {
        mappedData.stage = 'claim';
    }
    else if(mappedData.tokenClaimTime < curTimestamp && mappedData.raisedAmount < mappedData.softCap) {
        mappedData.stage = 'withdraw';
    }

    res.status(OK).json({
        success: true,
        message: 'STO fetched successfully',
        data: mappedData,
    });
});

const getMySTOs = catchAsync(async (req, res) => {
    const { address } = req.query;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const getSTOTokens = await contract.getSTOTokens(address);
    const mapSTOTokens = mapData(launchpadABI, 'getSTOTokens', getSTOTokens);

    res.status(OK).json({
        success: true,
        message: 'My STOs fetched successfully',
        data: mapSTOTokens,
    });
})

const getCountry = catchAsync(async (req, res) => {
    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const country = await contract.getValidCountries();
    res.status(OK).json({
        success: true,
        message: 'Country fetched successfully',
        data: country,
    });
})

const getIndustry = catchAsync(async (req, res) => {
    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const industry = await contract.getValidIndustries();
    res.status(OK).json({
        success: true,
        message: 'Industry fetched successfully',
        data: industry,
    });
})

const getInvestmentType = catchAsync(async (req, res) => {
    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const investmentType = await contract.getValidInvestmentType();
    res.status(OK).json({
        success: true,
        message: 'Investment type fetched successfully',
        data: investmentType,
    });
})

const getStage = catchAsync(async (req, res) => {
    const launchpadStoStageArray = Object.keys(launchpadStoStage).map((key) => {
        return { value: key, label: launchpadStoStage[key] }
    })

    res.status(OK).json({
        success: true,
        message: 'Stage fetched successfully',
        data: launchpadStoStageArray
    });
})

const getAllSTO = catchAsync(async (req, res) => {
    const { country, industry, investmentType, stage } = req.query;

    const contract = getContract(config.contract_address.launchpad, launchpadABI);
    const allSTO = await contract.getAllSTO();
    let mapAllSTO = mapData(launchpadABI, 'getAllSTO', allSTO);

    for(let i = 0; i < mapAllSTO.length; i++) {
        const investorCount = await contract.investorCount(mapAllSTO[i].stoToken);
        mapAllSTO[i].investorCount = serializeBigInt(investorCount);

        const isClaimedRaisedFund = await contract.isClaimedRaisedFund(mapAllSTO[i].stoToken);
        mapAllSTO[i].isClaimedRaisedFund = isClaimedRaisedFund;

        const details = await contract.details(mapAllSTO[i].stoToken);
        mapAllSTO[i].details = mapData(launchpadABI, 'details', details);

        const overview = await pinataService.fetchFromPinata(mapAllSTO[i].details.overview);
        mapAllSTO[i].details.overview = overview.overview;
        mapAllSTO[i].details.title = overview.title;
        const curTimestamp = Math.floor(new Date().getTime()/1000);

        if(mapAllSTO[i].endTime > curTimestamp && mapAllSTO[i].startTime < curTimestamp) {
            mapAllSTO[i].stage = 'public_sale';
        }
        else if(mapAllSTO[i].startTime > curTimestamp) {
            mapAllSTO[i].stage = 'coming_soon';
        }
        else if(mapAllSTO[i].endTime < curTimestamp && mapAllSTO[i].tokenClaimTime > curTimestamp) {
            mapAllSTO[i].stage = 'closed';
        }
        else if(mapAllSTO[i].tokenClaimTime < curTimestamp && mapAllSTO[i].raisedAmount > mapAllSTO[i].softCap) {
            mapAllSTO[i].stage = 'claim';
        }
        else if(mapAllSTO[i].tokenClaimTime < curTimestamp && mapAllSTO[i].raisedAmount < mapAllSTO[i].softCap) {
            mapAllSTO[i].stage = 'withdraw';
        }
    }

    mapAllSTO = mapAllSTO.filter((sto) => {
        return (country ? sto.details.country === country : true) 
            && (industry ? sto.details.industry === industry : true) 
            && (investmentType ? sto.details.investmentType === investmentType : true)
            && (stage ? sto.stage === stage : true);
    })

    res.status(OK).json({
        success: true,
        message: 'All STO fetched successfully',
        data: mapAllSTO,
    })
})

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
    getCountry,
    getIndustry,
    getInvestmentType,
    getStage,
    getMySTOs,
    getAllSTO,
};