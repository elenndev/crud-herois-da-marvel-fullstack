import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hero, NewHero } from './schema/heroes.model';

@Injectable()
export class HeroesService {
  heroes = [];
  constructor(@InjectModel('Hero') private readonly heroModel: Model<Hero>) {}

  async findAll(): Promise<Hero[]> {
    return this.heroModel.find().exec();
  }

  async insertOne(newHero: NewHero): Promise<string> {
    const newHeroDocument = new this.heroModel(newHero);
    const result = await newHeroDocument.save();
    return result._id.toString();
  }
}
