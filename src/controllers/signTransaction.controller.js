const { ethers } = require('ethers');
const { config } = require('../config/config');
const { OK } = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { getProvider } = require('../helper/web3.helper');

const signTransaction = catchAsync(async (req, res) => {
    const { txParams } = req.body;

    const signer = new ethers.Wallet(config.private_key, getProvider());

    const tx = await signer.sendTransaction(txParams);
    const receipt = await tx.wait();

    res.status(OK).json({
        success: true,
        message: 'Transaction signed successfully',
        data: { explorerUrl: `${config.explorer_url}/tx/${receipt.hash}`, receipt },
    });
});

module.exports = {
    signTransaction,
};
