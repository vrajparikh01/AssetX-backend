const { config } = require('../config/config');
const axios = require('axios');
const FormData = require('form-data');

async function pinFileToPinata(file) {
    try {
        // Prepare data for Pinata API
        const data = new FormData();
        data.append('file', file.buffer, file.originalname);
        // Upload the file to IPFS using Pinata
        const response = await axios.post(config.pinata.api_base_url + 'pinning/pinFileToIPFS', data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: config.pinata.api_key,
                pinata_secret_api_key: config.pinata.secret_key,
            },
        });
        return response.data.IpfsHash;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function pinFileToPinataFolder(file) {
    try{
        const data = new FormData();
        data.append('file', file.buffer, file.originalname);
        data.append('pinataOptions', {
            "groupId": config.pinata.group_id,
        });
        data.append('pinataMetadata',{
            "name": file.originalname
        });

        // https://api.pinata.cloud/data/pinList?status=pinned&groupId=f8c0e81b-3f0f-4d3e-87d8-d063fdbe3e7a&pinToIPFS=false
        const response = await axios.post(config.pinata.api_base_url + 'pinning/pinFileToIPFS', data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: config.pinata.api_key,
                pinata_secret_api_key: config.pinata.secret_key,
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
        const response = await axios.post(config.pinata.api_base_url + 'pinning/pinJSONToIPFS', data, {
            headers: {
                pinata_api_key: config.pinata.api_key,
                pinata_secret_api_key: config.pinata.secret_key,
            },
        });
        return response.data.IpfsHash;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function fetchFromPinata(hash) {
    try {
        const response = await axios.get(
            config.pinata.gateway_base_url + 'ipfs/' + hash + '?pinataGatewayToken=' + config.pinata.gateway_token
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    pinFileToPinata,
    uploadJSONToPinataIPFS,
    fetchFromPinata,
    pinFileToPinataFolder
};
