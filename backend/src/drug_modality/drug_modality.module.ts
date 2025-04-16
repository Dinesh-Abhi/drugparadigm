import { Module } from '@nestjs/common';
import { DrugModalityService } from './drug_modality.service';
import { DrugModalityController } from './drug_modality.controller';
import { DrugModality } from './drug_modality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DrugModality])],
  controllers: [DrugModalityController],
  providers: [DrugModalityService]
})
export class DrugModalityModule {}
