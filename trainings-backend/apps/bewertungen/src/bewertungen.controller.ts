import { Body, Controller, Get, Put } from '@nestjs/common';
import { BewertungenService } from './bewertungen.service';

@Controller('bewertungen')
export class BewertungenController {
  constructor(private readonly bewertungenService: BewertungenService) {}

  @Get()
  getBewertungen(): unknown[] {
    return this.bewertungenService.getBewertungen();
  }

  @Put()
  addBewertung(@Body() bew: unknown): void {
    this.bewertungenService.addBewertung(bew);
  }
}
