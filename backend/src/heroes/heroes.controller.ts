import { Body, Controller, Get, Post } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesCreateDto } from './dto/heroes.dto';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  async getAll() {
    const heroes = await this.heroesService.findAll();
    return { message: 'All heroes retrieved successfully', heroes };
  }

  @Post()
  async insertHero(@Body() bodyDto: HeroesCreateDto) {
    const newHeroId = await this.heroesService.insertOne(bodyDto);
    return { message: 'Heroe successfully', _id: newHeroId };
  }
}
