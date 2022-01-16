import { Test, TestingModule } from '@nestjs/testing';
import { BewertungenController } from './bewertungen.controller';
import { BewertungenService } from './bewertungen.service';

describe('BewertungenController', () => {
  let bewertungenController: BewertungenController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BewertungenController],
      providers: [BewertungenService],
    }).compile();

    bewertungenController = app.get<BewertungenController>(BewertungenController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bewertungenController.getHello()).toBe('Hello World!');
    });
  });
});
