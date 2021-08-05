const cron = require('node-cron');
const { buyCrypto } = require('./buyCrypto');


var task = cron.schedule(process.env.CRON_JOB_PATTERN, () => {
	console.log(`Script starts ${new Date().toISOString()}`);
    buyCrypto(process.env.crypto,process.env.currency,parseFloat(process.env.amount))
}, {
    timezone: "Asia/Kolkata"
});

