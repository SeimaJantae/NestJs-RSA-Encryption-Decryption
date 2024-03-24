import { Injectable } from '@nestjs/common';
import { DecryptDataDto } from './dto/decrypt-data.dto';
import { decryptAES } from 'src/AES';
import * as jwt from 'jsonwebtoken';
import { pub_key } from 'src/pub-pvt-key';

export interface ResponseDecrypt {
  successful: boolean;
  error_code: string;
  data: null | {
    payload: string;
  };
}

@Injectable()
export class DecryptService {
  decrypt(decryptDataDto: DecryptDataDto) {
    try {
      // Get AES key, decrypt data1 with public key
      const aesKey = jwt.verify(decryptDataDto.data1, pub_key, {
        algorithms: ['RS256'],
      });

      // Get payload, decrypt data2 with data AES key
      const aseKeyBuffer = Buffer.from(aesKey.toString(), 'hex');
      const payload = decryptAES(decryptDataDto.data2, aseKeyBuffer);

      // Response
      const response: ResponseDecrypt = {
        successful: true,
        error_code: '',
        data: {
          payload: payload,
        },
      };
      return response;
    } catch (error) {
      const response: ResponseDecrypt = {
        successful: false,
        error_code: 'Can not decrypt data, please check body request values',
        data: {
          payload: '',
        },
      };
      console.log(error);
      return response;
    }
  }
}
