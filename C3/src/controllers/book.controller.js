const express=require("express");
const mongoose=require("mongoose");
const { body, validationResult } = require('express-validator');
const route=express.Router();
const User=require("../models/book.model");

route.post("/",
    body("likes").not()
        .isEmpty()
        .min(0)
        .withMessage("No. of Characters should be in between 3 and 30"),
    body("lastName").isLength({min:3,max:30})
        .withMessage("No. of Characters should be in between 3 and 30"),
    async (req,res)=>{
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
                const book= await Book.create(req.body);
                return res.status(200).send(book);
            } catch (error) {
                return res.status(500).send({message:error.message});
            }
    });



module.exports=route;

