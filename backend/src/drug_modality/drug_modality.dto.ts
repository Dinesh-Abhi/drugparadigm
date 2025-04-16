// dto/drug-modality.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateDrugModalityDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  description?: string
}

export class GetDrugModalityDto {
  @ApiProperty({ type: Number })
  @IsOptional()
  id?: number

  @ApiProperty({ type: String })
  @IsOptional()
  name?: string
}
