import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abilities: {
    type: String,
    required: true,
  },
  origins: {
    type: String,
    required: true,
  },
});

export interface Hero extends mongoose.Document {
  _id: string;
}
