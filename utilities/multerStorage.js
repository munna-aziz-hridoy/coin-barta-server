const multer = require("multer");
const storage = multer.diskStorage({
  destination: "newsImagesCollection",
  filename: (req, file, cb) => {
    cb(null, Date.now + "coinbarta" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("newsImage");

module.exports = upload;
