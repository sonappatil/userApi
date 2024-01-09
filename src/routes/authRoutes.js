const express = require("express");
const authController = require("../controllers/authController");
const userUpload = require("../multer/userMulter");
const adminUpload = require("../multer/adminMulter");

const router = express.Router();

router.post("/user/signup",userUpload.single("profileImage"), authController.signup);
router.post("/admin/signup",adminUpload.single("profileImage") ,authController.adminsignup);
router.post("/login", authController.login);

module.exports = router;