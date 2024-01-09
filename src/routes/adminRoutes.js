const express = require("express");
const adminController = require("../controllers/adminController");
const authenticationMiddleware = require("../middlewares/authentication");
const authorizationMiddleware = require("../middlewares/authorization");
const userUpload = require("../multer/userMulter");

const adminRouter = express.Router();

adminRouter.use(authenticationMiddleware);

adminRouter.get("/admin/users" , authorizationMiddleware("Admin"), adminController.getAllUsers);
adminRouter.put("/admin/:id" , authorizationMiddleware("Admin"), userUpload.single("profileImage"), adminController.modifyUserDetails);
adminRouter.delete("/admin/:id", authorizationMiddleware("Admin"), adminController.deleteUser);



module.exports = adminRouter;