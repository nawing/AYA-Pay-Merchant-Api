"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _AYAPayMerchantClass_baseUrl, _AYAPayMerchantClass_prefixUrl, _AYAPayMerchantClass_consumerKey, _AYAPayMerchantClass_consumerSecret, _AYAPayMerchantClass_decryptionKey, _AYAPayMerchantClass_phone, _AYAPayMerchantClass_password, _AYAPayMerchantClass_keyToken, _AYAPayMerchantClass_apiToken;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AYAPayMerchantSDK = AYAPayMerchantSDK;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * @AYAMerchantSDK
 * @AYAMerchantSDK
 * @AYAMerchantSDK
 * @param {SDKOptions} options
 * @returns {AYAPayMerchantClass} A status message string.
 */
function AYAPayMerchantSDK(options) {
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
 * @AYAPayMerchantClass
 * @AYAPayMerchantClass
 */
class AYAPayMerchantClass {
    constructor(options) {
        _AYAPayMerchantClass_baseUrl.set(this, void 0);
        _AYAPayMerchantClass_prefixUrl.set(this, void 0);
        _AYAPayMerchantClass_consumerKey.set(this, void 0);
        _AYAPayMerchantClass_consumerSecret.set(this, void 0);
        _AYAPayMerchantClass_decryptionKey.set(this, void 0);
        _AYAPayMerchantClass_phone.set(this, void 0);
        _AYAPayMerchantClass_password.set(this, void 0);
        _AYAPayMerchantClass_keyToken.set(this, void 0);
        _AYAPayMerchantClass_apiToken.set(this, void 0);
        __classPrivateFieldSet(this, _AYAPayMerchantClass_baseUrl, options.baseUrl, "f");
        __classPrivateFieldSet(this, _AYAPayMerchantClass_prefixUrl, options.prefixUrl, "f");
        __classPrivateFieldSet(this, _AYAPayMerchantClass_consumerKey, options.consumerKey, "f");
        __classPrivateFieldSet(this, _AYAPayMerchantClass_consumerSecret, options.consumerSecret, "f");
        __classPrivateFieldSet(this, _AYAPayMerchantClass_decryptionKey, options.decryptionKey, "f");
        __classPrivateFieldSet(this, _AYAPayMerchantClass_phone, options.phone, "f");
        __classPrivateFieldSet(this, _AYAPayMerchantClass_password, options.password, "f");
    }
    /**
     * basicToken
     * @returns
     */
    basicToken() {
        const rawString = `${__classPrivateFieldGet(this, _AYAPayMerchantClass_consumerKey, "f")}:${__classPrivateFieldGet(this, _AYAPayMerchantClass_consumerSecret, "f")}`;
        const buffer = Buffer.from(rawString);
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
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAPayMerchantClass_baseUrl, "f")}/token`, body, config);
            const originResponse = response.data;
            const modifiedResponse = {
                accessToken: originResponse.access_token,
                scope: originResponse.scope,
                tokenType: originResponse.token_type,
                expiresIn: originResponse.expires_in,
            };
            __classPrivateFieldSet(this, _AYAPayMerchantClass_keyToken, modifiedResponse.accessToken, "f");
            return modifiedResponse;
        }
        catch (error) {
            console.error(error);
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
                    'Token': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_keyToken, "f")}`
                }
            };
            const body = {
                phone: __classPrivateFieldGet(this, _AYAPayMerchantClass_phone, "f"),
                password: __classPrivateFieldGet(this, _AYAPayMerchantClass_password, "f"),
            };
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAPayMerchantClass_baseUrl, "f")}/${__classPrivateFieldGet(this, _AYAPayMerchantClass_prefixUrl, "f")}/1.0.0/thirdparty/merchant/login`, body, config);
            const loginResponse = response.data;
            __classPrivateFieldSet(this, _AYAPayMerchantClass_apiToken, loginResponse.token.token, "f");
            return loginResponse;
        }
        catch (error) {
            console.error(error);
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
     * @param {string} options.amount
     * @param {string} options.currency
     * @param {string} options.externalTransactionId
     * @param {string} options.externalAdditionalData
     * @param {string} options.serviceCode
     * @param {boolean} options.MMQR
     * @param {number} options.timelimit
     * @returns {Promise<PaymentCreateResponse>}
     */
    async requestQR(options) {
        try {
            await this.authenticate();
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_keyToken, "f")}`,
                    'Authorization': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_apiToken, "f")}`,
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
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAPayMerchantClass_baseUrl, "f")}/${__classPrivateFieldGet(this, _AYAPayMerchantClass_prefixUrl, "f")}/1.0.0/thirdparty/merchant/v2/requestQRPayment`, body, config);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * paymentStatusQR
     * @param {PaymentStatusRequest} options
     * @param {string} options.referenceNumber
     * @param {string} options.externalTransactionId
     * @returns {Promise<PaymentStatusResponse>}
     */
    async paymentStatusQR(options) {
        try {
            await this.authenticate();
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_keyToken, "f")}`,
                    'Authorization': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_apiToken, "f")}`,
                }
            };
            const body = {
                externalTransactionId: options.externalTransactionId,
                referenceNumber: options.referenceNumber,
            };
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAPayMerchantClass_baseUrl, "f")}/${__classPrivateFieldGet(this, _AYAPayMerchantClass_prefixUrl, "f")}/1.0.0/thirdparty/merchant/checkQRPayment`, body, config);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * requestPush
     * @param {PaymentCreateRequest} options
     * @param {string} options.amount
     * @param {string} options.currency
     * @param {string} options.externalTransactionId
     * @param {string} options.externalAdditionalData
     * @param {string} options.serviceCode
     * @returns {Promise<PaymentCreateResponse>}
     */
    async requestPush(options) {
        try {
            await this.authenticate();
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_keyToken, "f")}`,
                    'Authorization': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_apiToken, "f")}`,
                }
            };
            const body = {
                amount: options.amount,
                currency: options.currency,
                externalTransactionId: options.externalTransactionId,
                externalAdditionalData: options.externalAdditionalData,
                serviceCode: options.serviceCode,
            };
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAPayMerchantClass_baseUrl, "f")}/${__classPrivateFieldGet(this, _AYAPayMerchantClass_prefixUrl, "f")}/1.0.0/thirdparty/merchant/v2/requestPushPayment`, body, config);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * paymentStatusPush
     * @param {PaymentStatusRequest} options
     * @param {string} options.referenceNumber
     * @param {string} options.externalTransactionId
     * @returns {Promise<PaymentStatusResponse>}
     */
    async paymentStatusPush(options) {
        try {
            await this.authenticate();
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Token': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_keyToken, "f")}`,
                    'Authorization': `Bearer ${__classPrivateFieldGet(this, _AYAPayMerchantClass_apiToken, "f")}`,
                }
            };
            const body = {
                externalTransactionId: options.externalTransactionId,
                referenceNumber: options.referenceNumber,
            };
            const response = await axios_1.default.post(`${__classPrivateFieldGet(this, _AYAPayMerchantClass_baseUrl, "f")}/${__classPrivateFieldGet(this, _AYAPayMerchantClass_prefixUrl, "f")}/1.0.0/thirdparty/merchant/checkRequestPayment`, body, config);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * verifyCallback
     * @param {CallbackEncoded} options
     * @param {string} options.paymentResult
     * @returns {Promise<CallbackDecoded>}
     */
    async verifyCallback(options) {
        try {
            const cipherRaw = Buffer.from(options.paymentResult, 'base64');
            const key = Buffer.from(__classPrivateFieldGet(this, _AYAPayMerchantClass_decryptionKey, "f"));
            const decipher = crypto_1.default.createDecipheriv('aes-256-ecb', key, null);
            let decrypted = decipher.update(cipherRaw, undefined, 'utf8');
            decrypted += decipher.final('utf8');
            const result = JSON.parse(decrypted);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * verifyCallbackRefund
     * @param {CallbackEncoded} options
     * @param {string} options.refundResult
     * @returns {Promise<CallbackDecoded>}
     */
    async verifyCallbackRefund(options) {
        try {
            const cipherRaw = Buffer.from(options.refundResult, 'base64');
            const key = Buffer.from(__classPrivateFieldGet(this, _AYAPayMerchantClass_decryptionKey, "f"));
            const decipher = crypto_1.default.createDecipheriv('aes-256-ecb', key, null);
            let decrypted = decipher.update(cipherRaw, undefined, 'utf8');
            decrypted += decipher.final('utf8');
            const result = JSON.parse(decrypted);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
}
_AYAPayMerchantClass_baseUrl = new WeakMap(), _AYAPayMerchantClass_prefixUrl = new WeakMap(), _AYAPayMerchantClass_consumerKey = new WeakMap(), _AYAPayMerchantClass_consumerSecret = new WeakMap(), _AYAPayMerchantClass_decryptionKey = new WeakMap(), _AYAPayMerchantClass_phone = new WeakMap(), _AYAPayMerchantClass_password = new WeakMap(), _AYAPayMerchantClass_keyToken = new WeakMap(), _AYAPayMerchantClass_apiToken = new WeakMap();
