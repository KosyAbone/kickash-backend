const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({});

const fileFilter = function (req, file, callback) {
  const allFileFormat = ['.jpeg', '.png', '.jpg', '.xlsx', '.mp3', '.mp4', '.doc', '.docx', '.pdf', '.txt', '.webm',
    '.wmv',
    '.mpeg',
    '.mkv',
    '.mov',
    '.flv'];

  const fileExtCheck = allFileFormat.includes(path.extname(file.originalname).toLowerCase());

  if (!fileExtCheck && file.originalname !== 'blob') {
    // Handle error directly without using BadRequestError
    callback(new Error('Upload failed. Supports only .jpeg, .png, .jpg, .xlsx, .doc, .docx, .pdf, .txt,  .webm, .wmv, .mpeg, .mkv, .mov, .flv or blob'), false);
  } else {
    callback(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = { upload };
