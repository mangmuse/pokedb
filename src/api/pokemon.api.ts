import { TPokemon } from "@/types/pokemons.type";
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export interface PokemonResponse {
  nextOffset: number | null;
  pokemons: TPokemon[];
}

// export const getPokemons = async (
//   pageParam: number | unknown = 0
// ): Promise<PokemonResponse> => {
//   const response = await axios.get<PokemonResponse>(
//     `api/pokemons?offset=${pageParam}&limit=30`
//   );
//   const data = response.data;

//   return data;
// };

// export const getPokemonData = async (
//   pokemonId: string
// ): Promise<TPokemon<true> | null> => {
//   try {
//     const { data } = await axios.get<TPokemon<true>>(
//       `api/pokemons/${pokemonId}`,
//       { params: { pokemonId } }
//     );
//     return data;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

export const getPokemons = async (
  pageParam: number | unknown = 0
): Promise<PokemonResponse> => {
  try {
    const response = await fetch(
      `${API_HOST}/api/pokemons?offset=${pageParam}&limit=6`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: PokemonResponse = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getPokemonData = async (
  pokemonId: string
): Promise<TPokemon<true> | null> => {
  try {
    const response = await fetch(
      `${API_HOST}/api/pokemons/${pokemonId}?pokemonId=${pokemonId}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: TPokemon<true> = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
