const express = require("express");
const userContoller = require("../controllers/userController");
const authenticationMiddleware = require("../middlewares/authentication");
const authorizationMiddleware = require("../middlewares/authorization");
const userUpload = require("../multer/userMulter");

const userRouter = express.Router();

userRouter.use(authenticationMiddleware);

userRouter.put("/user/:id" , authorizationMiddleware("User"), userUpload.single("profileImage"),userContoller.modifyUserDetails);
userRouter.delete("/user/:id", authorizationMiddleware("User"), userContoller.deleteUser);

module.exports = userRouter;