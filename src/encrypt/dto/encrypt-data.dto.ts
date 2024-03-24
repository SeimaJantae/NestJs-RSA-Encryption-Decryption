import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class EncryptDataDto {
  @ApiProperty({
    description: 'To encrypt this data',
    example: 'Hello',
  })
  @IsString()
  @MaxLength(2000)
  readonly payload: string;
}
