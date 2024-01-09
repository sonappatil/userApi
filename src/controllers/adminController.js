const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.getAllUsers = asyncHandler(async(req,res)=>{
    try {
        const users = await User.find(req.params.id);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
})

exports.modifyUserDetails = asyncHandler(async (req, res) => {
    try {
      const updatedUser = await User.findById(req.params.id);
         // console.log(updatedUser);
      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }
       
      const { email, phone, name, password, role} = req.body;
    const profileImage = req.file ? req.file.filename : updatedUser.profileImage;

      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {email, phone, name, password, role,profileImage},
        { new: true }
      );
  
      res.status(200).send(updateUser);
     // console.log(updateUser);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: error.message });
    }
  });

  exports.deleteUser = asyncHandler(async (req, res) => {
    try {
      const deletedUser = await User.findById(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).send({ message: "User not found" });
      }
  
      await User.findByIdAndDelete(req.params.id);
  
      res.status(200).send({ message: "User is deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });