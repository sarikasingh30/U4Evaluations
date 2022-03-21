const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    age :{type:Number,required:true},
    email:{type:String,required:true},
    // profileImages:[{type:String}]
},{
    timestamps:true,
    versionKey:false
});
const User=mongoose.model("users",userSchema);
module.exports=User;