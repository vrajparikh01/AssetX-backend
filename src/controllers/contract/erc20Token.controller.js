const { OK } = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { usdcTokenABI } = require('../../utils/contract/abi');
const { serializeBigInt } = require('../../helper/blockchainData.helper');
const { getContract } = require('../../utils/contractAggregator');
const { createTransaction } = require('../../helper/transaction.helper');
const stableCoins = require('../../config/stableCoins');

const balanceOf = catchAsync(async (req, res) => {
    const { tokenAddress, address } = req.query;

    const contract = getContract(tokenAddress, usdcTokenABI);
    const data = await contract.balanceOf(address);
    const serializeBigIntData = serializeBigInt(data);

    res.status(OK).json({
        success: true,
        message: 'Balance fetched successfully',
        data: {
            balance: serializeBigIntData,
        }
    });
});

const decimals = catchAsync(async (req, res) => {
    const { tokenAddress } = req.query;
    const contract = getContract(tokenAddress, usdcTokenABI);
    const data = await contract.decimals();
    const serializeBigIntData = serializeBigInt(data);

    res.status(OK).json({
        success: true,
        message: 'Decimals fetched successfully',
        data: {
            decimals: serializeBigIntData,
        },
    });
});

const approve = catchAsync(async (req, res) => {
    const { tokenAddress, spender, amount } = req.body;
    const contract = getContract(tokenAddress, usdcTokenABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'approve',
        args: [spender, amount],
        to: tokenAddress,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for approve',
        data: txParams
    });
})

const transfer = catchAsync(async (req, res) => {
    const { tokenAddress, to, amount } = req.body;
    const contract = getContract(tokenAddress, usdcTokenABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'transfer',
        args: [to, amount],
        to: tokenAddress,
    });
    
    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for transfer',
        data: txParams
    });
})

const getSableCoinList = catchAsync(async (req, res) => {
    const { address } = req.params;

    const stableCoinList = Object.keys(stableCoins).map((key) => {
        return {
            address: stableCoins[key]
        }
    })

    for(const coin of stableCoinList){
        const contract = getContract(coin.address, usdcTokenABI);
        const decimals = await contract.decimals();
        const name = await contract.name();
        const symbol = await contract.symbol();
        const serializeBigIntData = serializeBigInt(decimals);
        coin.decimals = serializeBigIntData;
        coin.name = name;
        coin.symbol = symbol;

        if(address){
            const balance = await contract.balanceOf(address);
            const serializeBigIntBalance = serializeBigInt(balance);
            coin.balance = serializeBigIntBalance;
        }
    }

    res.status(OK).json({
        success: true,
        message: 'Stable coin list fetched successfully',
        data: stableCoinList,
    });
})


module.exports = {
    balanceOf,
    decimals,
    approve,
    transfer,
    getSableCoinList,
};
