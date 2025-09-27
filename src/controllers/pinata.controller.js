const { OK, BAD_REQUEST } = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { pinataService } = require('../services');

const  uploadFileToPinata = catchAsync(async (req, res) => {
    if (!req.files) {
        throw new ApiError(BAD_REQUEST, 'Media is required');
    }

    const ipfsHash = [];
    for (let i = 0; i < req.files.length; i++) {
        ipfsHash.push(await pinataService.pinFileToPinata(req.files[i]));
    }

    res.status(OK).json({
        success: true,
        message: 'Image uploaded to IPFS successfully',
        data: ipfsHash,
    });
});

const uploadFileToPinataFolder = catchAsync(async (req, res) => {
    if (!req.files) {
        throw new ApiError(BAD_REQUEST, 'Media is required');
    }

    const ipfsHash = [];
    for (let i = 0; i < req.files.length; i++) {
        ipfsHash.push(await pinataService.pinFileToPinataFolder(req.files[i]));
    }

    res.status(OK).json({
        success: true,
        message: 'Image uploaded to IPFS successfully',
        data: ipfsHash,
    });
})

const uploadJSONToPinata = catchAsync(async (req, res) => {
    try {
        const { data } = req.body;
        const response = await pinataService.uploadJSONToPinataIPFS(data);

        res.status(OK).json({
            success: true,
            message: 'JSON uploaded to IPFS successfully',
            data: response,
        });
    } catch (error) {
        console.log(error);
        return error;
    }
})

const fetchFromPinata = catchAsync(async (req, res) => {
    try {
        const { hash } = req.query;
        const response = await pinataService.fetchFromPinata(hash);

        res.status(OK).json({   
            success: true,
            message: 'Data fetched from IPFS successfully',
            data: response,
        });
    } catch (error) {
        console.log(error);
        return error;
    }
});

module.exports = {
    uploadFileToPinata,
    uploadJSONToPinata,
    fetchFromPinata,
    uploadFileToPinataFolder
};