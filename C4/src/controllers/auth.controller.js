const User=require("../models/user.model");
var jwt=require("jsonwebtoken");
require('dotenv').config;

generateToken=(user)=>{
    return jwt.sign({user},process.env.secretkey);
}
const register=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
    if(user){
        return req.status(401).send({meassage:"Email Already there"});
    }
    user=await User.create(req.body);
    const token=generateToken(user);
    return res.status(200).send({user,token});
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
    
}
const login=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
    if(!user){
        return req.status(401).send({meassage:"Wrong Email or Password"});
    }
    else{
        const match=user.checkPassword(req.body.password);
    }
    if(!match){
        return res.status(401).send({message:error.message})
    }
    const token=generateToken(user);
    return res.status(200).send({user,token});
    } catch (error) {
        return res.status(401).send({message:error.message})
    }
    
}

module.exports={register,login}
