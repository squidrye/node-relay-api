const express = require("express");
const router = express.Router();
const axios = require("axios");
const fetchTokenResponse = async()=>{
    //i'll write it later on if needed , i'll have to figure this out
}

router.get("/",(req,res)=>{ 
    console.log(req);
    const DATA = req.body;
    console.log(DATA);
//     const DATA ={
//     'orderId': '1',
//     'orderAmount': 200,
//     'orderCurrency':"INR"
// }
const HEADER = {
    headers:{
        Accept: 'application/json',
        'x-client-id':process.env.CASHFREE_APP_KEY.replace(";", ""),
        'x-client-secret':process.env.CASHFREE_SECRET_KEY.replace(";", ""),
    }
}

axios.post('https://test.cashfree.com/api/v2/cftoken/order',DATA,HEADER).then((response)=>{
    if(response.status === 200){
        response = response;
        res.json(response.data);
    }
}).catch((e)=>{
    // console.error(e);
    res.json({success:DATA});
})});


module.exports = router;