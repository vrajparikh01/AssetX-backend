const express = require('express');
const { uploadStorage } = require('../../utils/multer');
const { pinataController } = require('../../controllers');
const { pinataValidation } = require('../../validations');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.get('/fetch-from-pinata', validate(pinataValidation.fetchFromPinata), pinataController.fetchFromPinata);
router.post('/upload-file-to-pinata', uploadStorage.array('media', 5), pinataController.uploadFileToPinata);
router.post('/upload-json-to-pinata', validate(pinataValidation.uploadJSONToPinata), pinataController.uploadJSONToPinata);
router.post('/upload-file-to-pinata-folder', uploadStorage.array('media', 5), pinataController.uploadFileToPinataFolder);

module.exports = router;
