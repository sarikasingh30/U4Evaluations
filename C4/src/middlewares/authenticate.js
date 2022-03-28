const req = require("express/lib/request");
const { decode } = require("jsonwebtoken");
var jwt=require("jsonwebtoken");
require('dotenv').config

const verifyToken=(token)=>{
    return new Promise((resolve,reject)=>{
            var decoded=jwt.verify(token,process.env.secretkey,function(err, decoded) {
                if(error){
                    return reject(error);
                }
                return resolve(decoded)
              })
    })
}

const authenticate=async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message:"Authorization token not found or incorrect"})
    }
    if(!req.headers.authorization.startsWith("Bearer ")){
        return res.status(401).send({message:"Authorization token not found or incorrect"})
    }
    const token=req.headers.authorization.trim().split(" ")[1];
    let decoded
    try {
        decoded=await verifyToken(token)
    } catch (error) {
        return res.status(401).send({message:"Authorization token not found or incorrect"})
    }
    req.user=decoded.user;
    return next()
}
module.exports=authenticate;