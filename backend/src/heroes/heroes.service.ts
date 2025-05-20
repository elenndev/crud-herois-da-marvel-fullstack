import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hero, NewHero } from './schema/heroes.model';
import { HeroesEditDto } from './dto/heroes.dto';

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

  async editOne(hero: HeroesEditDto, id: string): Promise<Hero> {
    const editedHeroDocument = await this.heroModel.findOneAndUpdate(
      { _id: id },
      hero,
      { new: true },
    );
    return editedHeroDocument as Hero;
  }

  async deleteOne(id: string): Promise<number> {
    const deleteHero = await this.heroModel.findOneAndDelete({ _id: id });
    if (deleteHero) {
      return 200;
    } else {
      return 400;
    }
  }
}
