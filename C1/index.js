const express=require("express");
const app=express();

// middleware for all
app.use(logger); 

app.get("/books",function(req,res){
    return res.json({"route":"/books","role":req.role});
});


app.get("/libraries",checkPermission("librarian"),function(req,res){
    return res.json({"route":"/libraries","permission":req.permission,"role":req.role});
});


app.get("/authors",checkPermission("author"),function(req,res){
    return res.json({"route":"/authors","permission":req.permission,"role":req.role});
});


function checkPermission(s){
    return function checkk(req,res,next){
        if(s=="librarian"){
            req.permission="true";
            return next();
        }
        else if(s=="author"){
            req.permission="true";
            return next();
        }
    }
}


function logger(req,res,next){
    if(req.path=="/books"){
        req.role="books";
    }
    else if(req.path=="/libraries"){
       req.role="libraries";
    }
    else if(req.path=="/authors"){
        req.role="authors";
     }
     next();
}

app.listen("7000",()=>{
    console.log("Port is 7000");
})