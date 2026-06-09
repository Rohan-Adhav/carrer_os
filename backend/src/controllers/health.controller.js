const getHome=(req,res)=>{
    res.send("Career OS API")
}

const getHealth=(req,res)=>{
    res.send("OK")
}

export {getHealth,getHome};