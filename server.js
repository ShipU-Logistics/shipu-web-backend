import dotenv from "dotenv";
dotenv.config(); 
import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("hey !")
})
app.listen(PORT, async()=>{
    console.log(`App is running on ${PORT}` )
})
