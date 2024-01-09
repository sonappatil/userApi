const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
        enum :['Admin',"User"],
        default :'Admin'
    },
});

const Admin = new mongoose.model("Admin", adminSchema);
module.exports = Admin;