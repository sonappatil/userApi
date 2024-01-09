require("dotenv").config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");
const userUpload = require("../multer/userMulter");



exports.signup = asyncHandler(async(req,res)=>{

    try {
        const { email, phone, name, password, role} = req.body;
        if(!email || !phone ||!name || !req.file||!password ){
           return res.status(400).json({message: "all the fields are required"});
        }
        const userAvailable = await User.findOne({$or: [{email}, {phone}]});
        
        if(userAvailable){
           return res.status(400).json({message: "User is already registered"})
        }
        //hashed password
        const hashedPassword = await bcrypt.hash(password,10);
       // console.log(hashedPassword);
       
       const profileImage = req.file.filename;

        const user = new User({
            email, phone, name, profileImage, 
            password:hashedPassword, 
            role
        });
        //console.log(`user created ${user}`);
       await user.save();
    
       res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"});
    }
    
})

exports.adminsignup = asyncHandler(async(req,res)=>{

    try {
        const { email, phone, name, password, role} = req.body;
        if(!email ||!name || !password ||! req.file || !phone){
           return res.status(400).json({message: "all the fields are required"});
        }
        const userAvailable = await Admin.findOne({email});
        
        if(userAvailable){
           return res.status(400).json({message: "Admin is already registered"})
        }
        //hashed password
        const hashedPassword = await bcrypt.hash(password,10);
        //console.log(hashedPassword);
        
        const profileImage = req.file.filename;

        const user = new Admin({
            email,   phone, name, profileImage, 
            password:hashedPassword, 
            role
        });
       // console.log(`user created ${user}`);
       await user.save();
    
       res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status.send({message:"Internal Server Error"});
    }
    
})

exports.login = asyncHandler(async(req,res)=>{
    try {
        const {email, password,role} = req.body;
        if (!email || !password || !role ) {
            return res.status(400).json({message:"All the fields are mendatory"});
        }
        const Model = role === "Admin" ? Admin : User;
        const user = await Model.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user:{
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user.id
                },
            }, process.env.ACCESS_SECRET_KEY,
            {expiresIn:"1h"}
            );
               res.status(200).send({accessToken});
            }
            else{
                res.status(401).send({message:"Password not valid"});
            }
         } catch (error) {
          console.log(error);
          res.status(500).send({message: "Internal server error"});
            
    }
})

