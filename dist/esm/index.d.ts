/**
 * @Login
 * @Login
 * @Login
 */
export interface loginRequest {
    phone: string;
    password: string;
}
export interface loginResponse {
    err: number;
    message: string;
    token: {
        token: string;
        expiredAt: string;
    };
    refreshToken: {
        token: string;
        expiredAt: string;
    };
}
/**
 * @Token
 * @Token
 * @Token
 */
export interface getTokenRequest {
    grantType: string;
}
export interface getTokenResponse {
    accessToken: string;
    scope: string;
    tokenType: string;
    expiresIn: number;
}
/**
 * @PaymentCreate
 * @PaymentCreate
 * @PaymentCreate
 */
export interface PaymentCreateRequest {
    amount: number;
    currency: string;
    externalTransactionId: string;
    externalAdditionalData?: string;
    serviceCode: string;
}
export interface PaymentCreateResponse {
    err: number;
    message: string;
    data: {
        qrdata: string;
        mmqrdata: string;
        merchantId: string;
        externalTransactionId: string;
        referenceNumber: string;
        amount: string;
        fees: {
            debitFee: number;
            creditFee: number;
        };
        currency: string;
        expiredAt: string;
    };
}
/**
 * @PaymentStatus
 * @PaymentStatus
 * @PaymentStatus
 */
export interface PaymentStatusRequest {
    referenceNumber: string;
    externalTransactionId: string;
}
export interface PaymentStatusResponse {
    err: number;
    message: string;
    status: string;
    transRefId: string;
}
/**
 * @Callback
 * @Callback
 * @Callback
 */
export interface CallbackEncoded {
    paymentResult?: string;
    refundResult?: string;
}
export interface CallbackDecoded {
    name: string;
    desc: string;
    currency: string;
    fees: {
        debitFee: number;
        creditFee: number;
    };
    status: string;
    createdAt: string;
    transRefId: string;
    code: string;
    extMachId: string;
    externalTransactionId: string;
    referenceNumber: string;
    totalAmount: number;
    amount: number;
    externalAdditionalData: string;
    refFields: {
        OFFERID: string;
        SENDERCLIENT: string;
        SENDERID: string;
        CURRENCY: string;
        RECEIVERCLIENT: string;
        TRANSACTIONID: string;
        REFERENCENUMBER: string;
        AMOUNT: number;
        RECEIVERPHONE: string;
        MESSAGE: string;
        VOUCHER: string;
        REQUESTID: string;
        SERVICEID: string;
        SUBUSERCLIENT: string;
        SHOPID: string;
        DEVICEID: string;
        MACHID: string;
        SUBUSERPHONE: string;
        SENDERPHONE: string;
        SENDERUSERID: string;
        RECEIVERUSERID: string;
        thirdpartyData: any;
        TRANSREFID: string;
        IP: string;
        USERID: string;
    };
    customer: {
        id: string;
        name: string;
        phone: string;
    };
    merchant: {
        id: string;
        name: string;
        phone: string;
    };
}
/**
 * @SDKOptions
 * @SDKOptions
 * @SDKOptions
 */
export interface SDKOptions {
    baseUrl: string;
    consumerKey: string;
    consumerSecret: string;
    decryptionKey: string;
    phone: string;
    password: string;
}
/**
 * @AYAMerchantSDK
 * @AYAMerchantSDK
 * @AYAMerchantSDK
 * @param {SDKOptions} options
 * @returns {AYAPayMerchantClass} A status message string.
 */
export declare function AYAPayMerchantSDK(options: SDKOptions): AYAPayMerchantClass;
/**
 * @AYAPayMerchantClass
 * @AYAPayMerchantClass
 * @AYAPayMerchantClass
 */
declare class AYAPayMerchantClass {
    #private;
    constructor(options: SDKOptions);
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
export {};
