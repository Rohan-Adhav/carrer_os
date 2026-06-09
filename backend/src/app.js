import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("Career OS API")
});
export default app;