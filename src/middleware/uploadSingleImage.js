const Multer = require("multer");

const uploadSingleImage = Multer({
  storage: Multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    let allowedTypes = ["image/png", "image/jpeg"];

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Tipo de arquivo não suportado."));
    }
  },
  limits: {
    filesize: 1024 * 1024 * 2, //máximo de 2mb
  },
});

module.exports = uploadSingleImage.single("image");