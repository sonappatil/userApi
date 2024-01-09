const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.modifyUserDetails = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await User.findById(req.params.id);

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    if (updatedUser.id.toString() !== req.user.id) {
      return res.status(403).send({ message: "User doesn't have permission to update" });
    }

    const { name } = req.body;
    const profileImage = req.file ? req.file.filename : updatedUser.profileImage;

    
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, profileImage},
      { new: true }
    );

    res.status(200).send(updateUser);
   // console.log(updateUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

exports.deleteUser = asyncHandler(async(req,res)=>{
    try {
        const deletedUser = await User.findById(req.params.id);

        if(!deletedUser){
            return res.status(404).send({message:"User is not found"});
        }

        if(deletedUser.id.toString() !== req.user.id){
            return  res.status(403).send({message:"User doesn't have permission to update"});
        }

        await User.deleteOne({_id : req.params.id});
        res.status(200).send({message: "User is deleted successfully"});
    } catch (error) {
        res.status(500).send({ message: error.message});
    }
})