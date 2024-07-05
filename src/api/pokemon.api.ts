import { TPokemon } from "@/types/pokemons.type";
import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export interface PokemonResponse {
  nextOffset: number | null;
  pokemons: TPokemon[];
}

export const getPokemons = async (
  pageParam: number | unknown = 0
): Promise<PokemonResponse> => {
  const response = await axios.get<PokemonResponse>(
    `${API_HOST}/api/pokemons?offset=${pageParam}&limit=30`
  );
  const data = response.data;

  return data;
};

export const getPokemonData = async (
  pokemonId: string
): Promise<TPokemon<true> | null> => {
  try {
    const { data } = await axios.get<TPokemon<true>>(
      `${API_HOST}/api/pokemons/${pokemonId}`,
      { params: { pokemonId } }
    );
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
