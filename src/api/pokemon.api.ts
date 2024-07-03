import { TPokemon } from "@/types/pokemons.type";
import axios from "axios";

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
): Promise<TPokemon<true> | null> => {
  try {
    const { data } = await axios.get<TPokemon<true>>(
      `http://localhost:3000/api/pokemons/${pokemonId}`,
      { params: { pokemonId } }
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
