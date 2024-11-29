const express = require("express");
const adminController = require("../controllers/adminController");
const authenticationMiddleware = require("../middlewares/authentication");
const authorizationMiddleware = require("../middlewares/authorization");
const userUpload = require("../multer/userMulter");
const adminUpload = require("../multer/adminMulter");

const adminRouter = express.Router();

adminRouter.use(authenticationMiddleware);

adminRouter.get("/admin/users" , authorizationMiddleware("Admin"), adminController.getAllUsers);
adminRouter.put("/admin/user/:id" , authorizationMiddleware("Admin"), userUpload.single("profileImage"), adminController.modifyUserDetails);
adminRouter.delete("/admin/user/:id", authorizationMiddleware("Admin"), adminController.deleteUser);
adminRouter.put("/admin/:id" , authorizationMiddleware("Admin"), adminUpload.single("profileImage"), adminController.modifyAdminDetails);
adminRouter.delete("/admin/:id", authorizationMiddleware("Admin"), adminController.deleteAdmin);

module.exports = adminRouter;
