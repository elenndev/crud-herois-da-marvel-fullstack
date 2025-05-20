import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
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

  @Put(':id')
  async updateHero(@Body() bodyDto: HeroesEditDto, @Param('id') id: string) {
    const editedHero = await this.heroesService.editOne(bodyDto, id);
    return { message: 'Hero updated', hero: editedHero };
  }

  @Delete(':id')
  async deleteHero(@Param('id') id: string) {
    const deletedHero = await this.heroesService.deleteOne(id);
    return {
      message: deletedHero == 200 ? 'Hero deleted' : 'Hero not found',
      deletedStatus: deletedHero,
    };
  }
}
