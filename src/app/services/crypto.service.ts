import { Injectable } from '@angular/core';
import {
  enc,
  HmacSHA256,
  HmacSHA512,
  MD5,
  PBKDF2,
  SHA256,
  SHA512,
} from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import * as yaml from 'js-yaml';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  secretValue: string;
  constructor() {}
  public GenerateHashBtn1(
    algorithem: string,
    output_encoading: string,
    inputValue: string,
    secretKey?: string
  ): string {
    if (secretKey !== undefined && secretKey.length > 0) {
      this.secretValue = secretKey;
    } else {
      this.secretValue = this.GenerateNewID();
    }
    if (typeof inputValue !== 'string' || inputValue.trim() === '') {
      throw new Error('Data must be a non-empty string');
    }
    if (algorithem.startsWith('hmac') && !this.secretValue) {
      throw new Error('Secret key must be provided for HMAC algorighms');
    }
    const encoding =
      output_encoading.toLocaleLowerCase() === 'hex'
        ? enc.Hex
        : output_encoading.toLocaleLowerCase() === 'base64'
        ? enc.Base64
        : enc.Latin1;

    try {
      let hash;
      if (algorithem.startsWith('hmac')) {
        const hmacAlgorithm = algorithem.replace('hmac-', '').toUpperCase();
        if (hmacAlgorithm === 'SHA256') {
          hash = HmacSHA256(inputValue, this.secretValue);
        } else if (hmacAlgorithm === 'SHA512') {
          hash = HmacSHA512(inputValue, this.secretValue);
        } else {
          throw new Error(`Unsupported HMAC algorithm: ${algorithem}`);
        }
      } else {
        switch (algorithem.toLowerCase()) {
          case 'sha256':
            hash = SHA256(inputValue);
            break;
          case 'sha512':
            hash = SHA512(inputValue);
            break;
          case 'md5':
            hash = MD5(inputValue);
            break;
          case 'pbkdf2':
            if (!this.secretValue) {
              throw new Error('Secret key is required for PBKDF2');
            }
            hash = PBKDF2(inputValue, this.secretValue, {
              keySize: 256 / 32,
            });
            break;
          default:
            throw new Error(`Unsupported algorithm: ${algorithem}`);
        }
      }
      return hash.toString(encoding);
    } catch (error) {
      throw new Error(
        `Failed to generate hash: ${
          error instanceof Error ? error.message : 'An unknown error occurred'
        }`
      );
    }
  }

  public GenerateNewID(): string {
    return uuidv4();
  }
  
  public convertToYaml(jsonObject: Record<string, any>): string {
    try {
      return yaml.dump(jsonObject);
    } catch (error) {
      console.error('Error converting JSON to YAML:', error);
      throw error;
    }
  }
  
}
