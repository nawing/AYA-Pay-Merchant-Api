import { CallbackDecoded, CallbackEncoded, getTokenResponse, loginResponse, PaymentCreateRequest, PaymentCreateResponse, PaymentStatusRequest, PaymentStatusResponse } from './types';
export { CallbackDecoded, CallbackEncoded, getTokenResponse, loginResponse, PaymentCreateRequest, PaymentCreateResponse, PaymentStatusRequest, PaymentStatusResponse };
/**
 * @InstanceOptions
 * @InstanceOptions
 * @InstanceOptions
 */
export interface InstanceOptions {
    baseUrl: string;
    prefixUrl: string;
    consumerKey: string;
    consumerSecret: string;
    decryptionKey: string;
    phone: string;
    password: string;
}
/**
 * @AYAPayMerchantApi
 * @param {InstanceOptions} options
 * @returns {AYAPayMerchantClass} A status message string.
 */
export declare function AYAPayMerchantApi(options: InstanceOptions): AYAPayMerchantClass;
/**
 * @AYAPayMerchantClass
 * @AYAPayMerchantClass
 * @AYAPayMerchantClass
 */
declare class AYAPayMerchantClass {
    #private;
    constructor(options: InstanceOptions);
    /**
     * basicToken
     * @returns
     */
    private basicToken;
    /**
     * getToken
     * @returns {Promise<getTokenResponse>}
     */
    private getToken;
    /**
     * login
     * @returns {Promise<loginResponse>}
     */
    private login;
    /**
     * authenticate
     */
    authenticate(): Promise<void>;
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
    requestQR(options: PaymentCreateRequest): Promise<PaymentCreateResponse>;
    /**
     * paymentStatusQR
     * @param {PaymentStatusRequest} options
     * @param {string} options.referenceNumber
     * @param {string} options.externalTransactionId
     * @returns {Promise<PaymentStatusResponse>}
     */
    paymentStatusQR(options: PaymentStatusRequest): Promise<PaymentStatusResponse>;
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
    requestPush(options: PaymentCreateRequest): Promise<PaymentCreateResponse>;
    /**
     * paymentStatusPush
     * @param {PaymentStatusRequest} options
     * @param {string} options.referenceNumber
     * @param {string} options.externalTransactionId
     * @returns {Promise<PaymentStatusResponse>}
     */
    paymentStatusPush(options: PaymentStatusRequest): Promise<PaymentStatusResponse>;
    /**
     * verifyCallback
     * @param {CallbackEncoded} options
     * @param {string} options.paymentResult
     * @returns {Promise<CallbackDecoded>}
     */
    verifyCallback(options: CallbackEncoded): Promise<CallbackDecoded>;
    /**
     * verifyCallbackRefund
     * @param {CallbackEncoded} options
     * @param {string} options.refundResult
     * @returns {Promise<CallbackDecoded>}
     */
    verifyCallbackRefund(options: CallbackEncoded): Promise<CallbackDecoded>;
}
