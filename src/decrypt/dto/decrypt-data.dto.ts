import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DecryptDataDto {
  @ApiProperty({
    description:
      'Copy from  response POST /get-encrypt-data data1: encrypted data from AES key and private key',
  })
  @IsString()
  readonly data1: string;

  @ApiProperty({
    description:
      'Copy from  response POST /get-encrypt-data data2: encrypted data from AES key and payload',
  })
  @IsString()
  readonly data2: string;
}
