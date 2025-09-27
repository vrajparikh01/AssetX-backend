const httpStatus = require("http-status");
const { getSigner } = require("../utils/web3Helper");
const { decrypt } = require("../utils/encrypt-decrypt");
const User = require("../models/user.model");

const createSigner = async (req, res, next) => {
    const signerUser = await User.findOne({
        address: req.body.walletAddress,
    });
    if (!signerUser) {
        return res.status(httpStatus.NOT_FOUND).send({
            status: httpStatus.NOT_FOUND,
            message: "Signer not found",
            data: null,
        });
    }
    const decryptedPrivateKey = decrypt(
        signerUser.privateKey
    );
    const signer = getSigner(decryptedPrivateKey);
    req.signer = signer;
    next();
};

module.exports = {
    createSigner,
};
