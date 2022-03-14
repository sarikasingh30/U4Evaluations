// mongodb+srv://sarika:12345@cluster0.3bl32.mongodb.net/Cluster0?authSource=admin&replicaSet=atlas-6x18cj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true

const express=require("express");
const app=express();
const mongoose=require("mongoose");

const connectDb=()=>{
    return mongoose.connect("mongodb+srv://sarika:12345@cluster0.3bl32.mongodb.net/Cluster0?authSource=admin&replicaSet=atlas-6x18cj-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
}
app.use(express.json());
// User Schema
    // Creating schemA
const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    middleName:{type:String},
    lastName:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    gender:{type:String,default:"female"},
    type:{type:String,default:"customer"},
},
{
    versionKey:false,
    timestamps:true,
});

// creating Model

const User=mongoose.model("user",userSchema);

// Branch detail
const branchSchema=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    IFSC:{type:String,required:true},
    MICR:{type:String,required:true},
    masterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"master",
        required:true,
    }
},{
    versionKey:false,
    timestamps:true,
})

// model
const Branch=mongoose.model("branch",branchSchema);

// Master Account

const masterSchema=new mongoose.Schema({
    balance:{type:Number,required:true},
    usedId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }

},{
    versionKey:false,
    timestamps:true
});

// model
const Master=mongoose.model("master",masterSchema);

// Savings Account
const savingSchema=new mongoose.Schema({
    accountNumber:{type:String,unique:true},
    balance:{type:Number,required:true},
    interestRate:{type:Number,required:true},
    masterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"master",
        required:true,
    }
   

},{
    versionKey:false,
    timestamps:true
});
// model
const Savings=mongoose.model("savings",savingSchema);


// Fixed Account
const fixedSchema=new mongoose.Schema({
    accountNumber:{type:String,unique:true},
    balance:{type:Number,required:true},
    interestRate:{type:Number,required:true},
    startDate:{type:Date, required:true},
    matureDate:{type:Date, required:true},
    masterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"master",
        required:true,
    }

},{
    versionKey:false,
    timestamps:true
});
// model
const Fixed=mongoose.model("fixed",fixedSchema);


app.get("/masters",async(req,res)=>{
    try {
        const master=await Master.find().populate().lean().exec();
        return res.status(203).send(master)
        
    } catch (error) {
        return res.status(501).send({message:error.message})
    }
});
// saving account Creation 
app.post("/savings",async(req,res)=>{
    try {
        const Savingd=await Savings.create(req.body);
        return res.status(203).send(Savingd);
    } catch (error) {
        return res.status(501).send({message:error.message});
    }
});
//  Fixed Account Creation 
app.post("/fixed",async(req,res)=>{
    try {
        const fixdd=await Fixed.create(req.body);
        return res.status(203).send(fixdd);
    } catch (error) {
        return res.status(501).send({message:error.message});
    }
});



app.listen(2006,()=>{
    try {
         connectDb();
    console.log("listening to port 2006")
    } catch (error) {
        console.log("Error>>>",error);
    }
})