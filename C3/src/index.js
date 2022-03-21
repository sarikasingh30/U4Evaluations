const express=require("express");
const userController=require("./controllers/user.controller");
const bookController=require("./controllers/book.controller");
// const publicationController=require("./controllers/publication.controller");
// const commentController=require("./controllers/comment.controller");


const app=express();
app.use(express.json());
app.use("/users",userController);
app.use("/books",bookController);
module.exports=app;