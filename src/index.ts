import axios from 'axios';
import crypto from 'crypto';
/**
 * @Login
 * @Login
 * @Login
 */
export interface loginRequest {
  phone: string,
  password: string
}
export interface loginResponse {
  err: number;
  message: string;
  token: {
    token: string;
    expiredAt: string;
  },
  refreshToken: {
    token: string;
    expiredAt: string;
  },
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
  MMQR: boolean;
  timelimit: number;
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
  }
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
  prefixUrl: string;
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
export function AYAPayMerchantSDK(options: SDKOptions): AYAPayMerchantClass {
  return new AYAPayMerchantClass({
    baseUrl: options.baseUrl,
    prefixUrl: options.prefixUrl,
    consumerKey: options.consumerKey,
    consumerSecret: options.consumerSecret,
    decryptionKey: options.decryptionKey,
    phone: options.phone,
    password: options.password,
  })
}
/**
 * @AYAPayMerchantClass
 * @AYAPayMerchantClass
 * @AYAPayMerchantClass
 */
class AYAPayMerchantClass {

  readonly #baseUrl: string;
  readonly #prefixUrl: string;
  readonly #consumerKey: string;
  readonly #consumerSecret: string;
  readonly #decryptionKey: string;
  readonly #phone: string;
  readonly #password: string;

  #keyToken: string;
  #apiToken: string;

  constructor(options: SDKOptions) {
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
  private basicToken(): string {
    const rawString = `${this.#consumerKey}:${this.#consumerSecret}`;
    const buffer: Buffer = Buffer.from(rawString);
    const base64String: string = buffer.toString('base64');
    return base64String;
  }
  /**
   * getToken
   * @returns {Promise<getTokenResponse>}
   */
  private async getToken(): Promise<getTokenResponse> {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${this.basicToken()}`
        }
      };
      const body = {
        grant_type: 'client_credentials'
      }
      const response = await axios.post(`${this.#baseUrl}/token`, body, config);
      const originResponse = response.data as {
        access_token: string;
        scope: string;
        token_type: string;
        expires_in: number;
      }
      const modifiedResponse: getTokenResponse = {
        accessToken: originResponse.access_token,
        scope: originResponse.scope,
        tokenType: originResponse.token_type,
        expiresIn: originResponse.expires_in,
      }
      this.#keyToken = modifiedResponse.accessToken;
      return modifiedResponse;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * login
   * @returns {Promise<loginResponse>}
   */
  private async login(): Promise<loginResponse> {
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
      }
      const response = await axios.post(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/login`, body, config);
      const loginResponse = response.data as loginResponse;
      this.#apiToken = loginResponse.token.token;
      return loginResponse as loginResponse;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * authenticate
   */
  public async authenticate(): Promise<void> {
    await this.getToken()
    await this.login()
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
  public async requestQR(options: PaymentCreateRequest): Promise<PaymentCreateResponse> {
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
      }
      const response = await axios.post(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/v2/requestQRPayment`, body, config);
      return response.data as PaymentCreateResponse
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * paymentStatusQR
   * @param {PaymentStatusRequest} options
   * @param {string} options.referenceNumber
   * @param {string} options.externalTransactionId
   * @returns {Promise<PaymentStatusResponse>}
   */
  public async paymentStatusQR(options: PaymentStatusRequest): Promise<PaymentStatusResponse> {
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
      }
      const response = await axios.post(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/checkQRPayment`, body, config);
      return response.data as PaymentStatusResponse
    } catch (error) {
      console.error(error)
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
  public async requestPush(options: PaymentCreateRequest): Promise<PaymentCreateResponse> {
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
      }
      const response = await axios.post(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/v2/requestPushPayment`, body, config);
      return response.data as PaymentCreateResponse
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * paymentStatusPush
   * @param {PaymentStatusRequest} options
   * @param {string} options.referenceNumber
   * @param {string} options.externalTransactionId
   * @returns {Promise<PaymentStatusResponse>}
   */
  public async paymentStatusPush(options: PaymentStatusRequest): Promise<PaymentStatusResponse> {
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
      }
      const response = await axios.post(`${this.#baseUrl}/${this.#prefixUrl}/1.0.0/thirdparty/merchant/checkRequestPayment`, body, config);
      return response.data as PaymentStatusResponse
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * verifyCallback
   * @param {CallbackEncoded} options
   * @param {string} options.paymentResult
   * @returns {Promise<CallbackDecoded>}
   */
  public async verifyCallback(options: CallbackEncoded): Promise<CallbackDecoded> {
    try {
      const cipherRaw = Buffer.from(options.paymentResult, 'base64');
      const key = Buffer.from(this.#decryptionKey);
      const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);
      let decrypted = decipher.update(cipherRaw, undefined, 'utf8');
      decrypted += decipher.final('utf8');
      const result: CallbackDecoded = JSON.parse(decrypted) as CallbackDecoded;
      return result as CallbackDecoded;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * verifyCallbackRefund
   * @param {CallbackEncoded} options
   * @param {string} options.refundResult
   * @returns {Promise<CallbackDecoded>}
   */
  public async verifyCallbackRefund(options: CallbackEncoded): Promise<CallbackDecoded> {
    try {
      const cipherRaw = Buffer.from(options.refundResult, 'base64');
      const key = Buffer.from(this.#decryptionKey);
      const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);
      let decrypted = decipher.update(cipherRaw, undefined, 'utf8');
      decrypted += decipher.final('utf8');
      const result: CallbackDecoded = JSON.parse(decrypted) as CallbackDecoded;
      return result as CallbackDecoded;
    } catch (error) {
      console.error(error)
    }
  }
}
