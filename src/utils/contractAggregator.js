const { ethers } = require("ethers");
const { getProvider } = require("../helper/web3.helper");

const getContract = (contractAddress, contractABI) => {
    return new ethers.Contract(contractAddress, contractABI, getProvider());
}

module.exports = {
    getContract
}