import { HmacSHA512 as hmacSHA512, lib, PBKDF2 } from 'crypto-js';
import * as AES from 'crypto-js/aes';
import * as Base64 from 'crypto-js/enc-base64';
import { v4 as uuid } from 'uuid';

import { ParamNotFoundException } from '../../errors';

const concatSaltAndPasswordString = '_stk_';

export const generateSalt = (secretKey: string): string => {
  if (!secretKey) {
    throw new ParamNotFoundException('secretKey');
  }
  const digest = Base64.stringify(lib.WordArray.random(16));
  return Base64.stringify(hmacSHA512(digest, secretKey + uuid()));
};

export const encryptPassword = ({
  password,
  secretKey,
  salt
}: {
  password: string;
  secretKey: string;
  salt?: string;
}): string => {
  if (!password) {
    throw new ParamNotFoundException('password');
  }
  if (!secretKey) {
    throw new ParamNotFoundException('secretKey');
  }
  if (!salt) {
    salt = generateSalt(secretKey);
  }
  const key = secretKey + salt;
  const digest = Base64.stringify(
    PBKDF2(password, key, {
      keySize: 512 / 32
    })
  );
  return (
    Base64.stringify(hmacSHA512(digest, key)) +
    concatSaltAndPasswordString +
    salt
  );
};

const getSaltFromPassword = (password: string) => {
  const salt = password?.split(concatSaltAndPasswordString)?.pop();
  return salt;
};

export const comparePassword = ({
  textPassword,
  encryptedPassword,
  secretKey
}: {
  textPassword: string;
  encryptedPassword: string;
  secretKey: string;
}): boolean => {
  const salt = getSaltFromPassword(encryptedPassword);
  return (
    encryptedPassword ===
    encryptPassword({ password: textPassword, salt, secretKey })
  );
};

export const encryptAES256 = (text: string, secretKey: string) =>
  AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
    mode: CryptoJS.mode.ECB
  }).toString();

export const decryptAES256 = (encryptedText: string, secretKey: string) =>
  AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(secretKey), {
    mode: CryptoJS.mode.ECB
  }).toString(CryptoJS.enc.Utf8);
