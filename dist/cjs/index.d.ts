import { CallbackDecoded, CallbackEncoded, getTokenResponse, loginResponse, PaymentCreateRequest, PaymentCreateResponse, PaymentStatusRequest, PaymentStatusResponse } from './types';
export { CallbackDecoded, CallbackEncoded, getTokenResponse, loginResponse, PaymentCreateRequest, PaymentCreateResponse, PaymentStatusRequest, PaymentStatusResponse };
/**
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
     * ...
     * @returns {Promise<PaymentCreateResponse>}
     */
    requestQR(options: PaymentCreateRequest): Promise<PaymentCreateResponse>;
    /**
     * paymentStatusQR
     * ...
     */
    paymentStatusQR(options: PaymentStatusRequest): Promise<PaymentStatusResponse>;
    /**
     * requestPush
     * ...
     */
    requestPush(options: PaymentCreateRequest): Promise<PaymentCreateResponse>;
    /**
     * paymentStatusPush
     * ...
     */
    paymentStatusPush(options: PaymentStatusRequest): Promise<PaymentStatusResponse>;
    /**
     * verifyCallback
     * ...
     */
    verifyCallback(options: CallbackEncoded): Promise<CallbackDecoded>;
    /**
     * verifyCallbackRefund
     * ...
     */
    verifyCallbackRefund(options: CallbackEncoded): Promise<CallbackDecoded>;
}
