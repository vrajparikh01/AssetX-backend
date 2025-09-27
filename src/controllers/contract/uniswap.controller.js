const { OK } = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { config } = require('../../config/config');
const { uniswapV2FactoryABI, uniswapV2PairABI, uniswapV2Router02ABI } = require('../../utils/contract/abi');
const { getContract } = require('../../utils/contractAggregator');
const { getProvider } = require('../../helper/web3.helper');
const { createTransaction } = require('../../helper/transaction.helper');
const { mapData } = require('../../helper/blockchainData.helper');

const createPair = catchAsync(async (req, res) => {
    const {
        stoTokenAddress,
        tokenB
    } = req.body;
    const contract = getContract(config.contract_address.uniswapV2Factory, uniswapV2FactoryABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'createPair',
        args: [
            stoTokenAddress,
            tokenB
        ],
        to: config.contract_address.uniswapV2Factory,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for createSTO',
        data: txParams,
    });
});

const addLiquidity = catchAsync(async (req, res) => {
    const {
        tokenA,
        tokenB,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        deadline
    } = req.body;

    const uniswapV2FactoryContract = getContract(config.contract_address.uniswapV2Factory, uniswapV2FactoryABI);
    const pairAddress = await uniswapV2FactoryContract.getPair(tokenA, tokenB);
    const pairContract = getContract(config.contract_address.uniswapV2Pair, uniswapV2PairABI);
    const pairV2 = pairContract.attach(pairAddress)
    const blockTimestamp = (await getProvider().getBlock("latest")).timestamp;

    const contract = getContract(config.contract_address.uniswapV2Router02, uniswapV2Router02ABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'addLiquidity',
        args: [
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            await pairV2.getAddress(),
            blockTimestamp + deadline
        ],
        to: config.contract_address.uniswapV2Router02,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for addLiquidity',
        data: txParams,
    });
})

const getAmountsOut = catchAsync(async (req, res) => {
    const {
        amountIn,
        tokenA,
        tokenB
    } = req.params;

    const contract = getContract(config.contract_address.uniswapV2Router02, uniswapV2Router02ABI);
    const amountsOut = await contract.getAmountsOut(amountIn, [tokenA, tokenB]);
    const mappedAmountsOut = mapData(uniswapV2Router02ABI, 'getAmountsOut', amountsOut);

    res.status(OK).json({
        success: true,
        message: 'Amounts out fetched successfully',
        data: mappedAmountsOut,
    });
})

const swapExactTokensForTokens = catchAsync(async (req, res) => {
    const {
        amountIn,
        amountOutMin,
        tokenA,
        tokenB,
        to,
    } = req.body;

    const contract = getContract(config.contract_address.uniswapV2Router02, uniswapV2Router02ABI);
    const blockTimestamp = (await getProvider().getBlock("latest")).timestamp;
    const deadline = blockTimestamp + 5 * 60; // 5 minutes from the current Unix time

    const txParams = await createTransaction({
        contract,
        functionName: 'swapExactTokensForTokens',
        args: [
            amountIn,
            amountOutMin,
            [tokenA, tokenB],
            to,
            deadline
        ],
        to: config.contract_address.uniswapV2Router02,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for swapExactTokensForTokens',
        data: txParams,
    });
})

const getPair = catchAsync(async (req, res) => {
    const {
        tokenA,
        tokenB
    } = req.query;

    const contract = getContract(config.contract_address.uniswapV2Factory, uniswapV2FactoryABI);
    const pairAddress = await contract.getPair(tokenA, tokenB);

    res.status(OK).json({
        success: true,
        message: 'Pair fetched successfully',
        data: pairAddress,
    });
})

module.exports = {
    createPair,
    addLiquidity,
    getAmountsOut,
    swapExactTokensForTokens,
    getPair
};
