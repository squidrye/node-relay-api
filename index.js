require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ratelimit= require("express-rate-limit");
const app = express();
const port = 3000;
const cashfree = require("./cashfree");

const limiter = ratelimit({
    windowMs:1000,
    max:1
})

//we have to whitelist some ips to secure our routes

const whitelist = ["http://127.0.0.1","http://127.0.0.1:5500"];
const corsOptions = {
    origin: (origin,callback)=>{
        if(!origin || whitelist.indexOf(origin) !=-1){
            callback(null,true);
        }else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessRate:200
}
app.use(limiter);

app.use(express.json());
app.use(cors(corsOptions));

app.get("/",(req,res) => res.json({success: "Hello World!"}));

app.use("/cashfree",cashfree);

app.listen(port,()=>console.log(`App listening on port ${port}`))