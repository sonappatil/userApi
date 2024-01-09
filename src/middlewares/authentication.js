const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

module.exports = asyncHandler(async(req,res, next)=>{
    try {
        let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) =>{
            if (err) {
                res.status(401);
                throw new Error("User  is not authorized");
            }
            req.user = decoded.user;
            next();
        })
    }
    if (!token) {
        res.status(401);
        throw new Error ("user is not authorized");
    }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
})

