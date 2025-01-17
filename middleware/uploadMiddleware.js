const multer  = require('multer');
const mime = require('mime');

const getFileName = (req, res, next) => {
  if (req.file) {
    req.body[req.file.fieldname] = req.file.filename || null
  }
  return next();
}

module.exports = {
  getFileName
}