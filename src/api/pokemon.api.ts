import { TPokemon } from "@/types/pokemons.type";
import axios from "axios";

export const getPokemons = async (): Promise<TPokemon[]> => {
  const path = "/api/pokemons";
  const res = await axios.get<TPokemon[]>(path);
  const pokemons = res.data;

  return pokemons;
};
