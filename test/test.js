const { AYAPayMerchantSDK } = require("../dist/cjs/index");
const dovenv = require("dotenv");
dovenv.config()
const { performance } = require("perf_hooks")


const AYAPaySDK = AYAPayMerchantSDK({
  baseUrl: process.env.BASE_URL,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  decryptionKey: process.env.DECRYPTION_KEY,
  phone: process.env.MERCHANT_PHONE,
  password: process.env.MERCHANT_PASSWORD,
})


const start = async () => {

  const startTime = performance.now();

  // const tokenResponse = await AYAPaySDK.getToken();
  // console.log(tokenResponse)
  // const end1Time = performance.now();
  // const latency1Ms = (end1Time - startTime).toFixed(3);
  // console.log(`\n--- Successful ---`);
  // console.log(`**Network Latency: ${latency1Ms} ms**`);

  // const loginResponse = await AYAPaySDK.login({
  //   phone: process.env.MERCHANT_PHONE,
  //   password: process.env.MERCHANT_PASSWORD,
  // });
  // console.log(loginResponse)
  // const end2Time = performance.now();
  // const latency2Ms = (end2Time - startTime).toFixed(3);
  // console.log(`\n--- Successful ---`);
  // console.log(`**Network Latency: ${latency2Ms} ms**`);

  const qrResponse = await AYAPaySDK.requestQR({
    amount: 5000,
    currency: 'MMK',
    externalTransactionId: 'ORD-' + new Date().getTime(),
    serviceCode: 'myantel-qr'
  })
  console.log(qrResponse)
  const end3Time = performance.now();
  const latency3Ms = (end3Time - startTime).toFixed(3);
  console.log(`\n--- Successful ---`);
  console.log(`**Network Latency: ${latency3Ms} ms**`);

  // const statusResponse = await AYAPaySDK.paymentStatusQR({
  //   referenceNumber: qrResponse.data.referenceNumber,
  //   externalTransactionId: qrResponse.data.externalTransactionId,
  // })
  // console.log(statusResponse)
  // const end4Time = performance.now();
  // const latency4Ms = (end4Time - startTime).toFixed(3);
  // console.log(`\n--- Successful ---`);
  // console.log(`**Network Latency: ${latency4Ms} ms**`);
}



start()
