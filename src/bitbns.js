const bitbnsApi = require('bitbns');
require('dotenv').config()


const bitbns = new bitbnsApi({
      apiKey :  process.env.PUBLIC_KEY,
      apiSecretKey : process.env.SECRET_KEY
});



module.exports = {
    bitbns
}