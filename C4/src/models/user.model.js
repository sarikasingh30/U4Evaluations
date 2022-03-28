const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    email:{type:String,required:true,uniqu:true},
    password:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
});
const User=mongoose.model("user",userSchema)
module.exports=User;