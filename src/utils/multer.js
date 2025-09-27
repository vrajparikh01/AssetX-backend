const multer = require('multer');
let storage = multer.memoryStorage();

const uploadStorage = multer({
  storage: storage,
  limits: {
      fileSize: 10 * 1024 * 1024,
    },
});


exports.uploadStorage = uploadStorage;