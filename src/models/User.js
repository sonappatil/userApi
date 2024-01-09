const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    
    email:{
        type : String,
        required : true,
        unique : true,
    },
    phone :{
        type: String,
        required : true,
        unique : true,
        maxlength : 10
    },
    name :{
        type : String,
        required : true
    },
    profileImage :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    role :{
        type : String,
        enum :['User', 'Admin'],
        default :'User'
    },
});

const User = new mongoose.model("User" , userSchema);

module.exports = User;