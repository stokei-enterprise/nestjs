import { ParamNotFoundException } from '@stokei/services/accounts/errors';
import { HmacSHA512 as hmacSHA512, PBKDF2, lib } from 'crypto-js';
import * as Base64 from 'crypto-js/enc-base64';
import * as AES from 'crypto-js/aes';
import { v4 as uuid } from 'uuid';

export const encryptPassword = (
  password: string,
  salt: string,
  secretKey: string
): string => {
  if (!password) {
    throw new ParamNotFoundException('password');
  }
  if (!salt) {
    throw new ParamNotFoundException('salt');
  }
  if (!secretKey) {
    throw new ParamNotFoundException('secretKey');
  }
  const key = secretKey + salt;
  const digest = Base64.stringify(
    PBKDF2(password, key, {
      keySize: 512 / 32
    })
  );
  return Base64.stringify(hmacSHA512(digest, key));
};

export const generateSalt = (secretKey: string): string => {
  if (!secretKey) {
    throw new ParamNotFoundException('secretKey');
  }
  const digest = Base64.stringify(lib.WordArray.random(16));
  return Base64.stringify(hmacSHA512(digest, secretKey + uuid()));
};

export const comparePassword = (
  textPassword: string,
  encryptedPassword: string,
  salt: string,
  secretKey: string
): boolean => {
  return encryptedPassword === encryptPassword(textPassword, salt, secretKey);
};

export const encryptAES256 = (text: string, secretKey: string) =>
  AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
    mode: CryptoJS.mode.ECB
  }).toString();

export const decryptAES256 = (encryptedText: string, secretKey: string) =>
  AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(secretKey), {
    mode: CryptoJS.mode.ECB
  }).toString(CryptoJS.enc.Utf8);
