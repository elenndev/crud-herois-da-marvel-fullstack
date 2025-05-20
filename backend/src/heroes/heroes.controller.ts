import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesCreateDto, HeroesEditDto } from './dto/heroes.dto';

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
    return { message: 'Hero created successfully', _id: newHeroId };
  }

  @Put()
  async updateHero(@Body() bodyDto: HeroesEditDto) {
    const editedHero = await this.heroesService.editOne(bodyDto);
    return { message: 'Hero updated', hero: editedHero };
  }
}
