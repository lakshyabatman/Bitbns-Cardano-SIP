

const {bitbns}  = require('./bitbns')


const buyCrypto = (crypto,currency, minAmount) => {
    console.log(`Buying ${crypto} from ${currency} with min amount ${minAmount}`)
    bitbns.platformStatus((err,status) => {

        if(err || (!status.data[crypto] || !status.data[crypto].status)) {
            console.error(`Failed to get status or invalid currency ${crypto}`,err)
            return;
        }

        bitbns.currentCoinBalance(currency, (error, coinBalanceStatus) =>{
            if(!error && coinBalanceStatus){           
                bitbns.getTickerApi(crypto, (err,cryptoPriceData) => {
                    if(!err && cryptoPriceData) {

                        let availableAmount = coinBalanceStatus.data.availableorderMoney 
                        let cryptoPrice = cryptoPriceData.data[crypto]['last_traded_price']

                        if(availableAmount>=minAmount) {
                            let quantity = (minAmount/cryptoPrice).toFixed(2);
                            bitbns.placeBuyOrder(crypto,quantity,cryptoPrice,(err,data) => {
                                if(!err) {
                                    console.log(`Placed bit on ${crypto} with currency ${currency} and quantity ${quantity}`)
                                }else {
                                    console.error(`Failed to buy ${crypto} quantity: ${quantity} at price: ${cryptoPrice}`,err)
                                }
                            })

                        }else {
                            console.error(`Insufficient Balance, balance: ${availableAmount} and cryptoPrice: ${cryptoPrice}`)
                        }

                    }else {
                        console.error(`Failed to fetch ${crypto} prices`,err)
                    }
                })
            } else {
              console.error('Failed to get balance ', error);
            }
        })
          

    })
}

module.exports = {
    buyCrypto
}