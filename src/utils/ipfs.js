const config = require('../config/config');
const axios = require('axios');
const FormData = require('form-data');

async function addImageToPinnata(file) {
    try {
        // Prepare data for Pinata API
        const data = new FormData();
        data.append('file', file.buffer, file.originalname);
        // Upload the file to IPFS using Pinata
        const response = await axios.post(config.pinnata.apiBaseUrl + 'pinning/pinFileToIPFS', data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: config.pinnata.apiKey,
                pinata_secret_api_key: config.pinnata.secretKey,
            },
        });
        return response.data.IpfsHash;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function uploadJSONToPinataIPFS(data) {
    try {
        // Upload the file to IPFS using Pinata
        const response = await axios.post(config.pinnata.apiBaseUrl + 'pinning/pinJSONToIPFS', data, {
            headers: {
                pinata_api_key: config.pinnata.apiKey,
                pinata_secret_api_key: config.pinnata.secretKey,
            },
        });
        return response.data.IpfsHash;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function fetchFromPinnata(hash) {
    try {
        const response = await axios.get(
            config.pinnata.gatewayBaseUrl + 'ipfs/' + hash + '?pinataGatewayToken=' + config.pinnata.gatewayToken
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    addImageToPinnata,
    uploadJSONToPinataIPFS,
    fetchFromPinnata,
};
