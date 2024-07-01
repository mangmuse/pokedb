export type TPokemonBaseName<IsDetail extends boolean = false> = {
  [id: string]: IsDetail extends true
    ? { korean_name: string; url: string; name: string }
    : { url: string; name: string };
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

//
export type TPokemonBaseInfoResponse = {
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: { type: { url: string; name: string } }[];
  abilities: { ability: { url: string; name: string } }[];
  moves: { move: { url: string; name: string } }[];
};

type TPokemonDetail = {
  abilities: TPokemonBaseName<true>[];
  types: TPokemonBaseName<true>[];
  moves: TPokemonBaseName<true>[];
};

export type TPokemon<IsDetail extends boolean = false> = {
  korean_name: string | null;
} & (IsDetail extends true
  ? Omit<TPokemonBaseInfoResponse, "types" | "abilities" | "moves"> &
      TPokemonDetail
  : TPokemonBaseInfoResponse);
