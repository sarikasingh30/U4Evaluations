const mongoose=require("mongoose");
// const publication=require("./publication.model")
const bookSchema=new mongoose.Schema({
    likes:{type:Number,required:true},
    coverImage:{type:String,required:true},
    content:{type:String,required:true},
    publicationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"publication",
        required:true,
    }
},{
    timestamps:true,
    versionKey:false
});
const Book=mongoose.model("books",bookSchema);
module.exports=Book;