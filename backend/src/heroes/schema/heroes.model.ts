import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abilities: {
    type: [String],
    required: true,
  },
  origins: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  marvelId: {
    type: String,
    required: true,
  },
});

export interface Hero extends mongoose.Document {
  _id: string;
}
export interface NewHero {
  name: string;
  abilities: string[];
  origins: string;
}
