import { Module } from '@nestjs/common';
import { BewertungenController } from './bewertungen.controller';
import { BewertungenService } from './bewertungen.service';

@Module({
  imports: [],
  controllers: [BewertungenController],
  providers: [BewertungenService],
})
export class BewertungenModule {}
