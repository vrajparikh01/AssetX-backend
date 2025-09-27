const { OK } = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { config } = require('../../config/config');
const { rwaTokenABI } = require('../../utils/contract/abi');
const { serializeBigInt } = require('../../helper/blockchainData.helper');
const { getContract } = require('../../utils/contractAggregator');
const { createTransaction } = require('../../helper/transaction.helper');

const balanceOf = catchAsync(async (req, res) => {
    const { address, rwaTokenAddress } = req.query;

    const contract = getContract(rwaTokenAddress, rwaTokenABI);
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

const details = catchAsync(async (req, res) => {
    const { rwaTokenAddress } = req.query;

    const contract = getContract(rwaTokenAddress, rwaTokenABI);
    const decimals = await contract.decimals();
    const name = await contract.name();
    const symbol = await contract.symbol();
    const serializeBigIntDecimals = serializeBigInt(decimals);
    const serializeBigIntSymbol = serializeBigInt(symbol);
    const serializeBigIntName = serializeBigInt(name);

    res.status(OK).json({
        success: true,
        message: 'Details fetched successfully',
        data: {
            decimals: serializeBigIntDecimals,
            name: serializeBigIntName,
            symbol: serializeBigIntSymbol,
        },
    });
});

const approve = catchAsync(async (req, res) => {
    const { rwaTokenAddress, spender, amount } = req.body;
    const contract = getContract(rwaTokenAddress, rwaTokenABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'approve',
        args: [spender, amount],
        to: rwaTokenAddress,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for approve',
        data: txParams
    });
})

const transfer = catchAsync(async (req, res) => {
    const { rwaTokenAddress, to, amount } = req.body;
    const contract = getContract(rwaTokenAddress, rwaTokenABI);
    const txParams = await createTransaction({
        contract,
        functionName: 'transfer',
        args: [to, amount],
        to: rwaTokenAddress,
    });

    res.status(OK).json({
        success: true,
        message: 'Transaction generated successfully for transfer',
        data: txParams
    });
})

module.exports = {
    balanceOf,
    details,
    approve,
    transfer,
};
