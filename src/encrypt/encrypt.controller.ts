import { Body, Controller, Post } from '@nestjs/common';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { EncryptService } from './encrypt.service';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

@Controller('get-encrypt-data')
export class EncryptController {
  constructor(private readonly encryptService: EncryptService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Encryption process is done, please check response',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, please check request',
  })
  encrypt(@Body() encryptDataDto: EncryptDataDto) {
    return this.encryptService.encrypt(encryptDataDto);
  }
}
