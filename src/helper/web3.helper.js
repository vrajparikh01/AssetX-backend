const { ethers } = require("ethers");
const { config } = require("../config/config");
const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");
const { mapLogs } = require("../helper/blockchainData.helper");

const walletIndex = 0;

const getProvider = () => {
    return new ethers.JsonRpcProvider(config.rpc_uri);
};

const getSigner = (privateKey) => {
    return new ethers.Wallet(privateKey, getProvider());
};

const signTransaction = async ({
    contract,
    functionName,
    to,
    signer,
    args,
}) => {
    const { data } = await contract[functionName].populateTransaction(...args);

    const txParams = { to, data, signer, signatureType: "EIP712_SIGN" };

    txParams.signature = await signer.signTransaction(txParams);

    return txParams;
};

async function createMnemonic() {
    const mnemonic = bip39.generateMnemonic();
    let seed = bip39.mnemonicToSeedSync(mnemonic).toString("hex");
    return seed;
}

async function createWallet() {
    const seed = await createMnemonic();
    const seedBuffer = Buffer.from(seed, "hex");
    const rootKey = hdkey.fromMasterSeed(seedBuffer);
    const hardenedKey = rootKey.derivePath("m/44'/60'/0'/0");

    // Derive the first account
    const childKey = hardenedKey.deriveChild(0);
    const wallet = childKey.getWallet();
    const address = wallet.getChecksumAddressString();
    const privateKey = wallet.getPrivateKey().toString("hex");
    walletIndex = walletIndex + 1;

    return {
        address,
        privateKey,
        seed,
    };
}

async function createNewWallet() {
    const provider = getProvider();
    const wallet = ethers.Wallet.createRandom(provider);
    return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic,
    };
}

async function executeContractTransaction(
    contract,
    signer,
    functionName,
    args
) {
    const txnObj = await contract.connect(signer)[functionName](...args);
    await txnObj.wait();
    return txnObj;
}

async function getEvent(contract, contractABI, txHash, eventName) {
    try {
        // Fetch the transaction receipt using the transaction hash
        const provider = getProvider();
        const receipt = await provider.getTransactionReceipt(txHash);
        if (!receipt) {
            console.error("Transaction receipt not found.");
            return;
        }

        // Find the event from the contract ABI
        const eventAbi = contractABI.find(
            (item) => item.name === eventName && item.type === "event"
        );
        if (!eventAbi) {
            console.error(`Event ${eventName} not found in contract ABI.`);
            return;
        }

        // Filter logs for the specific event
        const eventInterface = new ethers.Interface([eventAbi]);
        const filteredLogs = receipt.logs.filter(
            (log) => log.address.toLowerCase() === contract.target.toLowerCase()
        );

        const decodedEvents = filteredLogs.map((log) =>{
            return eventInterface.parseLog(log);
        })

        const mappedLogs = mapLogs(decodedEvents, eventName, contractABI);
        // Return the first occurrence of the event data
        return mappedLogs[0];
    } catch (error) {
        console.error("Error fetching event:", error);
        return;
    }
}

function isValidAddressJoiHelper(value, helpers) {
    if (ethers.isAddress(value)) {
        return value;
    }
    return helpers.error("any.invalid");
}

module.exports = {
    getSigner,
    signTransaction,
    getProvider,
    createNewWallet,
    executeContractTransaction,
    getEvent,
    isValidAddressJoiHelper,
};
