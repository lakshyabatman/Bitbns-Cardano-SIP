


// Sip({query: 'Lakshya'},  {
//     status: (v) => {
//         return {
//             send: console.log
//         }
//     }
        
// })


// module.exports = (req, res) => {
//     console.log(req)
//     if(req.method === 'POST') {
//         if(req.headers['x-auth'] && req.headers['x-auth']==process.env.VERCEL_SECRET) {
//             console.log("Buying Crypto now")
//             console.log(process.env)
//             // buyCrypto(process.env.crypto,process.env.currency,parseFloat(process.env.amount))
//             res.status(200).json({message: 'Success'})
//         }
//     }
//     res.status(404).json({message: 'You messed up !'})
//   };

module.exports = (req, res) => {
    const { name = 'World' } = req.query;
    res.status(200).send(`Hello ${name}!`);
  };