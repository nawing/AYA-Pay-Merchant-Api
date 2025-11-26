# 📘 AYA Pay Merchant API Integration Documentation (APIM)

This document provides a professional reference for integrating the **AYAPayMerchant** Node.js/TypeScript package into your application for handling payment and authentication flows.

## 🚀 Installation

Install the package via npm:

```bash
npm install aya-pay-merchant --save
```

## 📝 SDK Configuration and Initialization

The SDK requires specific credentials and endpoint information for initialization.

### `SDKOptions` Interface

This configuration object is passed to the initialization function.

| Property | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `baseUrl` | `string` | **Yes** | The base URL for the AYA Pay API (e.g., `https://api.gateway.com`). |
| `consumerKey` | `string` | **Yes** | Your merchant consumer key used for generating the Basic Token. |
| `consumerSecret` | `string` | **Yes** | Your merchant consumer secret used for generating the Basic Token. |
| `decryptionKey` | `string` | **Yes** | The AES-256-ECB secret key for decrypting payment callback data. |
| `basicKey` | `string` | No | *(Present in interface but currently unused in methods)*. |

### Initialization Example (TypeScript)

The `AYAPayMerchantSDK` function returns a class instance containing all core methods.

```javascript
import { AYAPayMerchantSDK, SDKOptions } from 'aya-pay-merchant';

const options: SDKOptions = {
  baseUrl: 'https://sandbox.ayapay.com/api', // <<< Request HERE I cannot disclose for security reasons
  consumerKey: 'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET',
  decryptionKey: 'YOUR_DECRYPTION_KEY_32_BYTES',
  basicKey: '', // Can be an empty string
};

const ayaPayClient = AYAPayMerchantSDK(options);

// Now you can call methods like:
// await ayaPayClient.getToken({ grantType: 'client_credentials' });
```

---

## 🔑 Authentication and Token Management

All merchant API interactions require two tokens: the **Key Token** (for `Token` header) and the **API Token** (for `Authorization` header).

### 1. `getToken()`

Requests the primary Key Token using the Client Credentials grant type. This token is stored internally and used in the `Token` header.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `options.grantType` | `string` | Must be set to `'client_credentials'`. |

#### `getTokenResponse` (Success Response)

| Property | Type | Description |
| :--- | :--- | :--- |
| `accessToken` | `string` | The Key Token obtained. |
| `tokenType` | `string` | Token type, e.g., `'Bearer'`. |
| `expiresIn` | `number` | Token expiry time in seconds. |

### 2. `login(options: loginRequest)`

Authenticates the merchant to retrieve the merchant-specific API Token and Refresh Token.

#### `loginRequest` (Parameters)

| Property | Type | Description |
| :--- | :--- | :--- |
| `phone` | `string` | Merchant's registered phone number. |
| `password` | `string` | Merchant's password. |

#### `loginResponse` (Success Response)

| Property | Type | Description |
| :--- | :--- | :--- |
| `err` | `number` | Error code (0 for success). |
| `message` | `string` | Status message. |
| `token.token` | `string` | The API Token, stored internally and used for payment methods. |
| `refreshToken.token` | `string` | The Refresh Token. |

---

## 💳 Payment Methods

### 1. `requestQR(options: PaymentCreateRequest)`

Generates a QR code for a customer to scan and pay.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `options` | `PaymentCreateRequest` | Object containing payment details. |

### 2. `requestPush(options: PaymentCreateRequest)`

Initiates a payment by sending a push notification request to the customer's payment app.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `options` | `PaymentCreateRequest` | Object containing payment details. |

#### `PaymentCreateRequest` (Parameters for QR/Push)

| Property | Type | Description |
| :--- | :--- | :--- |
| `amount` | `number` | Transaction amount. |
| `currency` | `string` | Currency code (e.g., `'MMK'`). |
| `externalTransactionId` | `string` | **Unique ID** from the merchant's system. |
| `serviceCode` | `string` | Merchant's service code. |
| `externalAdditionalData` | `string` | Optional field for extra merchant data. |

#### `PaymentCreateResponse` (Success Response)

| Property | Type | Description |
| :--- | :--- | :--- |
| `data.qrdata` | `string` | (QR) Raw QR code string. |
| `data.mmqrdata` | `string` | (QR) Myanmar QR code string. |
| `data.referenceNumber` | `string` | **Unique** transaction reference number from AYA Pay. |
| `data.amount` | `string` | Transaction amount confirmed. |
| `data.expiredAt` | `string` | Timestamp when the payment request expires. |

---

## 🔍 Status Check Methods

### 1. `paymentStatusQR(options: PaymentStatusRequest)`

Checks the status of a previously requested QR payment.

### 2. `paymentStatusPush(options: PaymentStatusRequest)`

Checks the status of a previously requested Push payment.

#### `PaymentStatusRequest` (Parameters for Status Check)

| Property | Type | Description |
| :--- | :--- | :--- |
| `referenceNumber` | `string` | The AYA Pay unique transaction reference number. |
| `externalTransactionId` | `string` | The merchant's unique transaction ID. |

#### `PaymentStatusResponse` (Success Response)

| Property | Type | Description |
| :--- | :--- | :--- |
| `status` | `string` | The transaction status (e.g., `'PENDING'`, `'SUCCESS'`, `'FAILED'`). |
| `transRefId` | `string` | Alias for the AYA Pay transaction ID. |
| `err` | `number` | Error code (0 for success). |

---

## 🔔 Callback Verification

This utility method is used by the merchant's callback endpoint to securely decrypt the transaction result payload sent by the AYA Pay system.

### `verifyCallback(options: CallbackEncoded)`

Decrypts the Base64-encoded, encrypted payload using AES-256-ECB with the configured `decryptionKey`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `options.paymentResult` | `string` | The encrypted and Base64-encoded payment payload from the callback body. |
| `options.refundResult` | `string` | The encrypted refund payload (if applicable). |
| `options.externalTransactionId` | `string` | The merchant's unique ID for context. |

| Returns | Type | Description |
| :--- | :--- | :--- |
| `Promise<CallbackDecoded>` | The raw, decrypted JSON string of the transaction result. **Must be parsed** into an object for use. |

### Decryption Example

```javascript
// Example handler for the merchant's callback endpoint (e.g., /api/payment/callback)

async function handleCallback(encodedBody) {
  try {
    const decryptedPayload = await ayaPayClient.verifyCallback(encodedBody);
    // The result is a JSON string, which must be parsed
    const paymentResult = JSON.parse(decryptedPayload as string);
    // Process paymentResult (e.g., update order status)
    console.log('Decrypted Status:', paymentResult.status);

  } catch (error) {
    console.error('Decryption Failed:', error);
  }
}
```
