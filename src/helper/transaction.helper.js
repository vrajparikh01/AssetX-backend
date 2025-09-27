const { ethers } = require("ethers");
const config = require("../config/config");

const createTransaction = async ({ contract, functionName, to, args, value, gasLimit }) => {
    const res = await contract[functionName].populateTransaction(...args);
    const txParams = { to, data: res.data };
    if (value) txParams.value = value;
    if (gasLimit) txParams.gasLimit = gasLimit;
    return txParams;
};

module.exports = { createTransaction };
