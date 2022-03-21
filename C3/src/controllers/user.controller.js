const express=require("express");
const mongoose=require("mongoose");
const { body, validationResult } = require('express-validator');
const route=express.Router();
const User=require("../models/user.model");

route.post("/",
    body("firstName").not()
        .isEmpty()
        .isLength({min:3,max:30})
        .withMessage("No. of Characters should be in between 3 and 30"),
    body("lastName").isLength({min:3,max:30})
        .withMessage("No. of Characters should be in between 3 and 30"),
    body("age").not().isEmpty().isNumeric().withMessage("Its Required").custom((value)=>{
            if(value<1||value>150){
                throw new Error("Invalid Age:its between 1 to 150");
            }
        }
    ),
    body("email").not()
        .isEmpty()
        .isEmail()
        .custom(async(value)=>{
            const user=await User.findOne({email:value})
                if(user){
                    throw new Error("Its already there...Email should be unique")
                }
                return true
        }
    ),
    async (req,res)=>{
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
                const user= await User.create(req.body);
                return res.status(200).send(user);
            } catch (error) {
                return res.status(500).send({message:error.message});
            }
    });



module.exports=route;

