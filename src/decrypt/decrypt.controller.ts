import { Body, Controller, Post } from '@nestjs/common';
import { DecryptService } from './decrypt.service';
import { DecryptDataDto } from './dto/decrypt-data.dto';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';

@Controller('get-decrypt-data')
export class DecryptController {
  constructor(private readonly encryptService: DecryptService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Decryption process is done, please check response',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, please check request',
  })
  decrypt(@Body() decryptDataDto: DecryptDataDto) {
    return this.encryptService.decrypt(decryptDataDto);
  }
}
