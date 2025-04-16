// services/drug-modality.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DrugModality } from './drug_modality.entity'
import { CreateOrUpdateDrugModalityDto, GetDrugModalityDto } from './drug_modality.dto'

@Injectable()
export class DrugModalityService {
  constructor(
    @InjectRepository(DrugModality)
    private readonly drugModalityRepo: Repository<DrugModality>
  ) {}

  async createOrUpdate(dto: CreateOrUpdateDrugModalityDto) {
    try {
      const existing = await this.drugModalityRepo.findOne({ where: { name: dto.name } })

      if (existing) {
        existing.description = dto.description
        await this.drugModalityRepo.save(existing)
        return { Error: false, message: 'Drug modality updated successfully' }
      }

      const newModality = this.drugModalityRepo.create(dto)
      await this.drugModalityRepo.save(newModality)
      return { Error: false, message: 'Drug modality created successfully' }
    } catch (err) {
      return { Error: true, message: 'Failed to create or update drug modality' }
    }
  }

    async getAll() {
      try {
        const allModalities = await this.drugModalityRepo.find();
  
        return {
          Error: false,
          payload: allModalities,
        };
      } catch (error) {
        return {
          Error: true,
          message: 'Failed to retrieve drug modalities',
        };
      }
    }

  async getBy(dto: GetDrugModalityDto) {
    if (!dto.id && !dto.name) {
      throw new BadRequestException('Either id or name must be provided.')
    }

    const condition: any = {}
    if (dto.id) condition.id = dto.id
    if (dto.name) condition.name = dto.name

    const modalities = await this.drugModalityRepo.find({ where: condition })

    return {
      Error: false,
      payload: modalities
    }
  }
}
