import { FetchInfiniteQueryOptions } from "@tanstack/react-query";
import { getPokemons } from "./pokemon.api";

export const pokemonOptions: FetchInfiniteQueryOptions = {
  queryKey: ["pokemons"],
  queryFn: async () => {
    const res = await getPokemons();
    return res;
  },
  getNextPageParam: (lastPage: any) => {
    return lastPage.nextOffset;
  },
  initialPageParam: 0,
};
