export class HeroesGetDto {
  readonly _id: string;
  readonly name: string;
  readonly abilities: string[];
  readonly origins: string;
}

export class HeroesCreateDto {
  readonly name: string;
  readonly abilities: string[];
  readonly origins: string;
}

export class HeroesEditDto {
  readonly name: string;
  readonly abilities: string[];
  readonly origins: string;
}
