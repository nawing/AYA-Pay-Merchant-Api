const { AYAPayMerchantSDK } = require("../dist/cjs/index");
const dovenv = require("dotenv");
dovenv.config()


let callBackIncomingRequest = {
  paymentResult: 'dnNP4EiXl/0i8fCeg27YuLF9117NTpaYK2FSzXBpGfWnZIHpoYAvIUjsOmJqjR1i+wU1Czk171RZZucGsQazZGpXr0y2DwvRJWrK/MpDgs1Ko5EeYnt/Zz/F5Fo8HLKkFPh2I5uMEWwo4pOvKtkWtyN+0RcwmlBmgze67GxjBP1HF4ElJFivvVatWqWqQokvf5G1yyMLnvJKvy+qZRZjdR4kqTzS03dZVD/wuSvt6X4VwQtd0CjYFK45U1KPUIo5+t+vwHJK1qCPKQmY7Ky8F/ql14XdbKlVu4lCM/hX/8Be+wTiK2TNntWqzZoaipy3JloB+twyEVGCleMgov0iiULSxpjKa0LyziBhakY0nCXLjPMQsGvCj09WLj9tkHYGvVqkYk1ySk2HF1Xrz5/Erzh9zuqNbFDx2lmfZMqNTYv/LVW1dCTZaqdy/Ti/9bmy8x205XRHbdH1R9pBEY6BU4tsf/gZf8Iku/40yzMeLx88nmoi5+4W7hSJE6TCaWLhCWnuoWiuyA6OUbMu/QN9i537clGJp3f7/0neSULj3pRYeETHWU3/3CthBW7sRFk6kqU22zm8zToYjbwbQDJMdO3h2SZcvPOL6HLKuS3kLLdCoylvv00/3sjmONJg+2Pho/esJLD9LiX9KuZ0U0CqXw4QZKQVJ0X7esddyWg6U0pxw5SeSzlNjoODcwfEATsTvOmWMd917gANH4rWTEOuz1T6+Z4NHltTprqWEitY9jpvONxm3KQuCuwbE2KJif9bvVqkYk1ySk2HF1Xrz5/ErwX8ZXT3NJBMaA/epwT1tlRl7mSdEJ+Br6aDwh4sJ2R2eNZJnp8c2q4u9j9bHeCsksn4MKDSD+21OKfjCjYHLabNmGQ4iowjjKHtHteYRbplidfC187gCV28e9FbuaIUtOswC6rvEFHmEvkXX2Vftz8Rrll/ZaGk3NMJ3UqmzwLGe0jQMprHPboFZWOwX+HQR4DHQX8acTAkdPU3xArf9COUYZL0TED+J6b4L8u5Go260ex1j1YI9opxRSbfocVn+8jDpgLV7Da7EVNSwKd8YC7toZe+x+N5yBob0d5qK/m7p2aSIB8hK+Dh6hRrf5N+DILApjzQkp12SlKfnSwryHPHW9Gm/e7xdmP1DmggVzgTf2j3od3fF2+Tz842Izez8t8crm7YvIM9otwOysjskNZTYC3nwebRTBXiDYhmsOhJCHoyQXP6Kl/7lOKTymfcET05FMpsF7Lmm6yC6hbq4bpr8xLOqlV8/sbiVCergsw4OyqTCKeE/p5pH2V3lWZT4Es/3yASJVF88pfFoFI7+QmQTUGNpZHhjfe0o/yBhPUys+02oYfSoXWpFfxADXp56v4xq3hWChUPhZBaiRFuYrjfS9WHDxTcKuYmzRXAUUAxo7HlGZJdscGITuv+g/BeyIBgBhx4JmqPvDrMapKUTXmFY+BYEqQmCcYHaPLG6VkcAe8ZJSZ4gEIFUF9ciBjKxKppglo0NXmFTg3JXC6y2FtwS+RaO5c/pMOvYoQOWjeLQZoiYjXzketcLdUrVrRSRjWNGNq8WEbg1pmswn0A3etZVZi6SPtAiVeiY0mJaZn6pYktfaUbb708GbWAYVxphPsepwgRSDw83twoXTkPVGW0cg4/RUbUR9RwkLBaPIK2runnRXRQJrCHJiIFcCmudAJy7hWzn8nSaHmPRZeFoY0iVGMVr4dIvi/nhrcD7wDT',
  checksum: '34209caea8ad0825027e4b118674955cf2231abd3925fb995a2a4e91ebcc495e',
  refundResult: '',
  externalTransactionId: 'XX-1764916875394',
  payByOtherPay: 'false',
  debitorName: '',
  mmqrRefId: '',
  walletName: 'AYA Pay'
}

const AYAPaySDK = AYAPayMerchantSDK({
  baseUrl: process.env.BASE_URL,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  decryptionKey: process.env.DECRYPTION_KEY,
  phone: process.env.MERCHANT_PHONE,
  password: process.env.MERCHANT_PASSWORD,
})


const start = async () => {
  const callbackDecoded = await AYAPaySDK.verifyCallback(callBackIncomingRequest)
  console.log(callbackDecoded)
}


start()
