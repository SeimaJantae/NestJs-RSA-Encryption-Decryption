import * as crypto from 'crypto';

const iv: Buffer = crypto.randomBytes(16);

export function encryptAES(data: string, key: Buffer | crypto.CipherKey) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
export function decryptAES(
  encryptedData: string,
  key: Buffer | crypto.CipherKey,
) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
