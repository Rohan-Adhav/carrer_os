import { Router } from "express";
const router = Router();
router.get("/",(req,res)=>{
    res.send("Career OS API");
});

router.get("/health",(req,res)=>{
    res.send("OK");
});

export default router;