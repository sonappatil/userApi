const multer = require("multer");
const path = require("path");

// Multer Configuration
const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/userImage"); // Specify the folder where images will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
});

const userUpload = multer({ storage: userStorage });

module.exports = userUpload;
