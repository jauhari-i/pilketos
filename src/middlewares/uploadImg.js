const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './src/uploads/',
  filename: function (req, file, cb) {
    cb(null, 'Kandidat' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
}).single('foto');

module.exports = upload;
