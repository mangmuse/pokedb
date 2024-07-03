export type TPokemonBaseName<IsDetail extends boolean = false> = {
  [id: string]: IsDetail extends true
    ? { korean_name: string; url: string; name: string }
    : { url: string; name: string };
};

type TPokemonDetail<IsDetial extends boolean = false> = {
  abilities: TPokemonBaseName<IsDetial>[];
  types: TPokemonBaseName<IsDetial>[];
  moves: TPokemonBaseName<IsDetial>[];
};

export type TPokemonPageResponse = {
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type TPokemonBaseInfoResponse = TPokemonDetail & {
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
};

export type TSpeciesResponse = {
  name: string;
  names: [
    {
      language: {
        name: string;
        url: string;
      };
      name: string;
    }
  ];
};

export type TPokemon<IsDetail extends boolean = false> = {
  korean_name: string | null;
  name: string;
} & (IsDetail extends true
  ? Omit<TPokemonBaseInfoResponse, "types" | "abilities" | "moves"> &
      TPokemonDetail<true>
  : TPokemonBaseInfoResponse);
