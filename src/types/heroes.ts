export type TypeHero = {
  _id: string;
  marvelId: string;
  name: string;
  abilities: string[];
  origins: string;
  thumbnail: string;
}

export type TypeNewHero = Omit<TypeHero, '_id'>

export type TypeEditHero = Omit<TypeHero, '_id'>
