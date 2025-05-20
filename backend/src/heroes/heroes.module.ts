import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroSchema } from './schema/heroes.model';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Hero', schema: HeroSchema }])],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
