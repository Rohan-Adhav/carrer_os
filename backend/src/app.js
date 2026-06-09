import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("Career OS API");
});

app.get("/health",(req,res)=>{
    res.send("OK");
});

export default app;