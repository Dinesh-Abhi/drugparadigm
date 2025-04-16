// controllers/drug-modality.controller.ts
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { DrugModalityService } from './drug_modality.service'
import {
  CreateOrUpdateDrugModalityDto,
  GetDrugModalityDto,
} from './drug_modality.dto'

@ApiTags('Drug Modality')
@Controller('drug-modality')
export class DrugModalityController {
  private filepath: string;
  constructor(
    private readonly service: DrugModalityService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create or update a drug modality' })
  @ApiResponse({ status: 201, description: 'Drug modality created/updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @UsePipes(new ValidationPipe())
  async createOrUpdate(@Body() dto: CreateOrUpdateDrugModalityDto) {
    return this.service.createOrUpdate(dto)
  }


  @Get('all')
  @ApiOperation({ summary: 'Get all drug modalities' })
  @ApiResponse({ status: 200, description: 'All drug modalities retrieved successfully' })
  async getAllDrugModalities() {
    return this.service.getAll();
  }

  @Get('get-model')
  @ApiOperation({ summary: 'Get a drug modality by provided filters' })
  @ApiResponse({ status: 200, description: 'Drug modality retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Drug modality not found' })
  async getBy(@Body() dto: GetDrugModalityDto) {
    return this.service.getBy(dto)
  }
}
