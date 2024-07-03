import { TPokemon } from "@/types/pokemons.type";
import axios from "axios";

// export const getPokemons = async (): Promise<TPokemon[]> => {
//   const path = `/api/pokemons`;
//   try {
//     const res = await axios.get<{
//       pokemons: TPokemon[];
//       nextPage: number | null;
//     }>(path);
//     const pokemons = res.data.pokemons;
//     if (!pokemons) {
//       throw new Error("No pokemons found");
//     }
//     return pokemons;
//   } catch (e) {
//     console.error(e);
//     throw new Error();
//   }
// };

// export const getPokemons = async (): Promise<TPokemon[]> => {
//   const path = "/api/pokemons";
//   const res = await axios.get<TPokemon[]>(path);
//   const pokemons = res.data;

//   return pokemons;
// };

export interface PokemonResponse {
  nextOffset: number | null;
  pokemons: TPokemon[];
}

export const getPokemons = async (
  pageParam: number | unknown = 0
): Promise<PokemonResponse> => {
  const response = await axios.get<PokemonResponse>(
    `http://localhost:3000/api/pokemons?offset=${pageParam}&limit=30`
  );
  const data = response.data;

  return data;
};

export const getPokemonData = async (
  pokemonId: string
): Promise<TPokemon<true>> => {
  const { data } = await axios.get<TPokemon<true>>(
    `http://localhost:3000/api/pokemons/${pokemonId}`,
    { params: { pokemonId } }
  );
  return data;
};
