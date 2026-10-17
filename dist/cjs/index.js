"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AYAPayMerchantApi = AYAPayMerchantApi;
const buffer_1 = require("buffer");
const crypto_1 = __importDefault(require("crypto"));
/**
 * @AYAPayMerchantApi
 * @param {InstanceOptions} options
 * @returns {AYAPayMerchantClass} A status message string.
 */
function AYAPayMerchantApi(options) {
    return new AYAPayMerchantClass({
        baseUrl: options.baseUrl,
        prefixUrl: options.prefixUrl,
        consumerKey: options.consumerKey,
        consumerSecret: options.consumerSecret,
        decryptionKey: options.decryptionKey,
        phone: options.phone,
        password: options.password,
    });
}
/**
 * @AYAPayMerchantClass
 */
class AYAPayMerchantClass {
    #baseUrl;
    #prefixUrl;
    #consumerKey;
    #consumerSecret;
    #decryptionKey;
    #phone;
    #password;
    #keyToken = '';
    #apiToken = '';
    constructor(options) {
        this.#baseUrl = options.baseUrl;
        this.#prefixUrl = options.prefixUrl;
        this.#consumerKey = options.consumerKey;
        this.#consumerSecret = options.consumerSecret;
        this.#decryptionKey = options.decryptionKey;
        this.#phone = options.phone;
        this.#password = options.password;
    }
    /**
     * basicToken
     * @returns
     */
    basicToken() {
        const rawString = `${this.#consumerKey}:${this.#consumerSecret}`;
        const buffer = buffer_1.Buffer.from(rawString);
        const base64String = buffer.toString('base64');
        return base64String;
    }
    /**
     * getToken
     * @returns {Promise<getTokenResponse>}
     */
    async getToken() {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${this.basicToken()}`
                }
            };
            const body = {
                grant_type: 'client_credentials'
            };
            const formBody = new URLSearchParams();
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined)
                    formBody.append(key, String(value));
            });
            const response = await fetch(`${this.#baseUrl}/token`, {
                method: 'POST',
                headers: config.headers,
                body: formBody
            });
            const originResponse = (await response.json());
            const modifiedResponse = {
                accessToken: originResponse.access_token,
                scope: originResponse.scope,
                tokenType: originResponse.token_type,
                expiresIn: originResponse.expires_in,
            };
            this.#keyToken = modifiedResponse.accessToken;
            return modifiedResponse;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * login
     * @returns {Promise<loginResponse>}
     */
    async login() {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${this.#keyToken}`
                }
            };
            const body = {
                phone: this.#phone,
                password: this.#password,
            };
            const formBody = new URLSearchParams();
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined)
                    formBody.append(key, String(value));
            });
            const response = await fetch(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/login`, {
                method: 'POST',
                headers: config.headers,
                body: formBody
            });
            const loginResponse = (await response.json());
            this.#apiToken = loginResponse.token.token;
            return loginResponse;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * authenticate
     */
    async authenticate() {
        await this.getToken();
        await this.login();
    }
    /**
     * requestQR
     * @param {PaymentCreateRequest} options
     * ...
     * @returns {Promise<PaymentCreateResponse>}
     */
    async requestQR(options) {
        try {
            await this.authenticate();
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${this.#keyToken}`,
                    'Authorization': `Bearer ${this.#apiToken}`,
                }
            };
            const body = {
                amount: options.amount,
                currency: options.currency,
                externalTransactionId: options.externalTransactionId,
                externalAdditionalData: options.externalAdditionalData,
                serviceCode: options.serviceCode,
                MMQR: options.MMQR,
                timelimit: options.timelimit,
            };
            const formBody = new URLSearchParams();
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined)
                    formBody.append(key, String(value));
            });
            const response = await fetch(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/v2/requestQRPayment`, {
                method: 'POST',
                headers: config.headers,
                body: formBody
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * paymentStatusQR
     * ...
     */
    async paymentStatusQR(options) {
        try {
            await this.authenticate();
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${this.#keyToken}`,
                    'Authorization': `Bearer ${this.#apiToken}`,
                }
            };
            const body = {
                externalTransactionId: options.externalTransactionId,
                referenceNumber: options.referenceNumber,
            };
            const formBody = new URLSearchParams();
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined)
                    formBody.append(key, String(value));
            });
            const response = await fetch(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/checkQRPayment`, {
                method: 'POST',
                headers: config.headers,
                body: formBody
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * requestPush
     * ...
     */
    async requestPush(options) {
        try {
            await this.authenticate();
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${this.#keyToken}`,
                    'Authorization': `Bearer ${this.#apiToken}`,
                }
            };
            const body = {
                amount: options.amount,
                currency: options.currency,
                externalTransactionId: options.externalTransactionId,
                externalAdditionalData: options.externalAdditionalData,
                serviceCode: options.serviceCode,
            };
            const formBody = new URLSearchParams();
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined)
                    formBody.append(key, String(value));
            });
            const response = await fetch(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/v2/requestPushPayment`, {
                method: 'POST',
                headers: config.headers,
                body: formBody
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * paymentStatusPush
     * ...
     */
    async paymentStatusPush(options) {
        try {
            await this.authenticate();
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${this.#keyToken}`,
                    'Authorization': `Bearer ${this.#apiToken}`,
                }
            };
            const body = {
                externalTransactionId: options.externalTransactionId,
                referenceNumber: options.referenceNumber,
            };
            const formBody = new URLSearchParams();
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined)
                    formBody.append(key, String(value));
            });
            const response = await fetch(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/checkRequestPayment`, {
                method: 'POST',
                headers: config.headers,
                body: formBody
            });
            return (await response.json());
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * verifyCallback
     * ...
     */
    async verifyCallback(options) {
        try {
            if (!options.paymentResult)
                throw new Error("paymentResult is missing or undefined");
            const cipherRaw = buffer_1.Buffer.from(options.paymentResult, 'base64');
            const key = buffer_1.Buffer.from(this.#decryptionKey);
            const decipher = crypto_1.default.createDecipheriv('aes-256-ecb', key, null);
            let decrypted = decipher.update(cipherRaw, undefined, 'utf8');
            decrypted += decipher.final('utf8');
            const result = JSON.parse(decrypted);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    /**
     * verifyCallbackRefund
     * ...
     */
    async verifyCallbackRefund(options) {
        try {
            if (!options.refundResult)
                throw new Error("refundResult is missing or undefined");
            const cipherRaw = buffer_1.Buffer.from(options.refundResult, 'base64');
            const key = buffer_1.Buffer.from(this.#decryptionKey);
            const decipher = crypto_1.default.createDecipheriv('aes-256-ecb', key, null);
            let decrypted = decipher.update(cipherRaw, undefined, 'utf8');
            decrypted += decipher.final('utf8');
            const result = JSON.parse(decrypted);
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
