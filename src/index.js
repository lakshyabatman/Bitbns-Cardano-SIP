const cron = require('node-cron');
const { buyCrypto } = require('./buyCrypto');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(bodyParser.json());
// var task = cron.schedule(process.env.CRON_JOB_PATTERN, () => {
// 	console.log(`Script starts ${new Date().toISOString()}`);
//     buyCrypto(process.env.crypto,process.env.currency,parseFloat(process.env.amount))
// }, {
//     timezone: "Asia/Kolkata"
// });


app.get("/",(req,res) => {
    return res.json({message:'Hello world'})
})


const runner = (cryptos) => {
    let cryptoArray = String(cryptos).split(",")
    for(let crypto of cryptoArray) {
        console.log(crypto)
        buyCrypto(crypto,process.env.currency,parseFloat(process.env.amount)) 
    }

}

app.post("/", (req,res) => {
    if(req.headers['vercel_secret'] === process.env.VERCEL_SECRET) {
        runner(process.env.crypto)
        return res.status(200).json({message:'Success'})
    }
    return res.status(401).json({message: 'Unauth'})
})


app.listen(process.env.PORT || 3000 ,() => {
    console.log("Server running")
})


