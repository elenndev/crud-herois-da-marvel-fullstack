export type TypeHero = {
  _id: string;
  name: string;
  abilities: string[];
  origins: string;
}

export type TypeNewHero = Omit<TypeHero, '_id'>

export type TypeEditHero = Omit<TypeHero, '_id'>
