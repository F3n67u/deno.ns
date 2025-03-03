// deno-lint-ignore-file
// deno-fmt-ignore-file
// DO NOT EDIT - This file is automatically maintained by `npm run generate-crypto-types`

/** Basic cryptography features available in the current context. It allows access to a cryptographically strong random number generator and to cryptographic primitives. */
export interface Crypto {
  /** Available only in secure contexts. */
  readonly subtle: SubtleCrypto;
  getRandomValues<T extends ArrayBufferView | null>(array: T): T;
  /** Available only in secure contexts. */
  randomUUID(): string;
}

/**
 * This Web Crypto API interface provides a number of low-level cryptographic functions. It is accessed via the Crypto.subtle properties available in a window context (via Window.crypto).
 * Available only in secure contexts.
 */
export interface SubtleCrypto {
  decrypt(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<any>;
  deriveBits(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, length: number): Promise<ArrayBuffer>;
  deriveKey(algorithm: AlgorithmIdentifier | EcdhKeyDeriveParams | HkdfParams | Pbkdf2Params, baseKey: CryptoKey, derivedKeyType: AlgorithmIdentifier | AesDerivedKeyParams | HmacImportParams | HkdfParams | Pbkdf2Params, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
  digest(algorithm: AlgorithmIdentifier, data: BufferSource): Promise<ArrayBuffer>;
  encrypt(algorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, key: CryptoKey, data: BufferSource): Promise<any>;
  exportKey(format: "jwk", key: CryptoKey): Promise<JsonWebKey>;
  exportKey(format: Exclude<KeyFormat, "jwk">, key: CryptoKey): Promise<ArrayBuffer>;
  generateKey(algorithm: RsaHashedKeyGenParams | EcKeyGenParams, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair>;
  generateKey(algorithm: AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
  generateKey(algorithm: AlgorithmIdentifier, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair | CryptoKey>;
  importKey(format: "jwk", keyData: JsonWebKey, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
  importKey(format: Exclude<KeyFormat, "jwk">, keyData: BufferSource, algorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
  sign(algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams, key: CryptoKey, data: BufferSource): Promise<ArrayBuffer>;
  unwrapKey(format: KeyFormat, wrappedKey: BufferSource, unwrappingKey: CryptoKey, unwrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams, unwrappedKeyAlgorithm: AlgorithmIdentifier | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | AesKeyAlgorithm, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKey>;
  verify(algorithm: AlgorithmIdentifier | RsaPssParams | EcdsaParams, key: CryptoKey, signature: BufferSource, data: BufferSource): Promise<boolean>;
  wrapKey(format: KeyFormat, key: CryptoKey, wrappingKey: CryptoKey, wrapAlgorithm: AlgorithmIdentifier | RsaOaepParams | AesCtrParams | AesCbcParams | AesGcmParams): Promise<ArrayBuffer>;
}

export type AlgorithmIdentifier = Algorithm | string;

export interface Algorithm {
  name: string;
}

export interface RsaOaepParams extends Algorithm {
  label?: BufferSource;
}

export type BufferSource = ArrayBufferView | ArrayBuffer;

export interface AesCtrParams extends Algorithm {
  counter: BufferSource;
  length: number;
}

export interface AesCbcParams extends Algorithm {
  iv: BufferSource;
}

export interface AesGcmParams extends Algorithm {
  additionalData?: BufferSource;
  iv: BufferSource;
  tagLength?: number;
}

/**
 * The CryptoKey dictionary of the Web Crypto API represents a cryptographic key.
 * Available only in secure contexts.
 */
export interface CryptoKey {
  readonly algorithm: KeyAlgorithm;
  readonly extractable: boolean;
  readonly type: KeyType;
  readonly usages: KeyUsage[];
}

export interface KeyAlgorithm {
  name: string;
}

export type KeyType = "private" | "public" | "secret";
export type KeyUsage = "decrypt" | "deriveBits" | "deriveKey" | "encrypt" | "sign" | "unwrapKey" | "verify" | "wrapKey";
export declare var CryptoKey: {
      prototype: CryptoKey;
      new(): CryptoKey;
  };

export interface EcdhKeyDeriveParams extends Algorithm {
  public: CryptoKey;
}

export interface HkdfParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  info: BufferSource;
  salt: BufferSource;
}

export type HashAlgorithmIdentifier = AlgorithmIdentifier;

export interface Pbkdf2Params extends Algorithm {
  hash: HashAlgorithmIdentifier;
  iterations: number;
  salt: BufferSource;
}

export interface AesDerivedKeyParams extends Algorithm {
  length: number;
}

export interface HmacImportParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  length?: number;
}

export interface JsonWebKey {
  alg?: string;
  crv?: string;
  d?: string;
  dp?: string;
  dq?: string;
  e?: string;
  ext?: boolean;
  k?: string;
  key_ops?: string[];
  kty?: string;
  n?: string;
  oth?: RsaOtherPrimesInfo[];
  p?: string;
  q?: string;
  qi?: string;
  use?: string;
  x?: string;
  y?: string;
}

export interface RsaOtherPrimesInfo {
  d?: string;
  r?: string;
  t?: string;
}

export type KeyFormat = "jwk" | "pkcs8" | "raw" | "spki";

export interface RsaHashedKeyGenParams extends RsaKeyGenParams {
  hash: HashAlgorithmIdentifier;
}

export interface RsaKeyGenParams extends Algorithm {
  modulusLength: number;
  publicExponent: BigInteger;
}

export type BigInteger = Uint8Array;

export interface EcKeyGenParams extends Algorithm {
  namedCurve: NamedCurve;
}

export type NamedCurve = string;

export interface CryptoKeyPair {
  privateKey: CryptoKey;
  publicKey: CryptoKey;
}

export interface AesKeyGenParams extends Algorithm {
  length: number;
}

export interface HmacKeyGenParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
  length?: number;
}

export interface RsaHashedImportParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
}

export interface EcKeyImportParams extends Algorithm {
  namedCurve: NamedCurve;
}

export interface AesKeyAlgorithm extends KeyAlgorithm {
  length: number;
}

export interface RsaPssParams extends Algorithm {
  saltLength: number;
}

export interface EcdsaParams extends Algorithm {
  hash: HashAlgorithmIdentifier;
}

export declare var SubtleCrypto: {
      prototype: SubtleCrypto;
      new(): SubtleCrypto;
  };
export declare var Crypto: {
      prototype: Crypto;
      new(): Crypto;
  };
