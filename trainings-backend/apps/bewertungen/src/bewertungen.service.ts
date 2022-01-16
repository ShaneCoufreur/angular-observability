import { Injectable } from '@nestjs/common';

@Injectable()
export class BewertungenService {
  private bewertungen = [
    {
      id: 'b1',
      stars: 5,
      bewerter: 'Steffi',
      trainingId: 't1',
    },
    {
      id: 'b2',
      stars: 4,
      bewerter: 'Harry',
      trainingId: 't1',
    },
    {
      id: 'b3',
      stars: 5,
      bewerter: 'Rosi',
      trainingId: 't3',
    },
    {
      id: 'b4',
      stars: 5,
      bewerter: 'Karla',
      trainingId: 't4',
    },
    {
      id: 'b5',
      stars: 4,
      bewerter: 'Hans',
      trainingId: 't2',
    },
    {
      id: 'b6',
      stars: 5,
      bewerter: 'Stefan',
      trainingId: 't2',
    },
    {
      id: 'b7',
      stars: 5,
      bewerter: 'Christian',
      trainingId: 't1',
    },
    {
      id: 'b8',
      stars: 5,
      bewerter: 'Sahra',
      trainingId: 't1',
    },
    {
      id: 'b9',
      stars: 5,
      bewerter: 'Peterchen',
      trainingId: 't2',
    },
  ];

  getBewertungen(): unknown[] {
    return this.bewertungen;
  }

  addBewertung(bew: any): void {
    bew.id = `b${Math.ceil(Math.random() * 1e9)}`;
    this.bewertungen.push(bew);
  }
}
