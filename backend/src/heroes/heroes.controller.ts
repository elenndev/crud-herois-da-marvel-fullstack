import { Controller, Get } from '@nestjs/common';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  async getAll() {
    const heroes = await this.heroesService.findAll();
    return { message: 'All heroes retrieved successfully', heroes };
  }
}
