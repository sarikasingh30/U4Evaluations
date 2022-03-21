const app=require("./index")
const connection=require("./configs/db");

app.listen(4900, async()=>{
    try {
        console.log("Listening to port 4900")
    } catch (error) {
        console.log("Error",error);
    }
})