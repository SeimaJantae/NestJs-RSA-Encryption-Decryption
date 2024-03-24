import { Injectable } from '@nestjs/common';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { pvt_key } from 'src/pub-pvt-key';
import { encryptAES } from '../AES';

export interface ResponseEncrypt {
  successful: boolean;
  error_code: string;
  data: null | {
    data1: string;
    data2: string;
  };
}

@Injectable()
export class EncryptService {
  encrypt(encryptDataDto: EncryptDataDto) {
    try {
      // For data2, encrypt payload with AES key
      const aesKey = crypto.randomBytes(32); // aes-256 key must be 256 bits (32 bytes)
      const data2 = encryptAES(encryptDataDto.payload, aesKey);

      // For data1, encrypt AES key with private key
      const data1 = jwt.sign(aesKey.toString('hex'), pvt_key, {
        algorithm: 'RS256',
      });

      // Response
      const response: ResponseEncrypt = {
        successful: true,
        error_code: '',
        data: {
          data1: data1,
          data2: data2,
        },
      };
      return response;
    } catch (error) {
      const response: ResponseEncrypt = {
        successful: false,
        error_code: 'Can not encrypt data, please check body request values',
        data: {
          data1: '',
          data2: '',
        },
      };
      console.log(error);
      return response;
    }
  }
}
