"use client";
import { PokemonResponse, getPokemons } from "@/api/pokemon.api";
import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

export default function usePokemonsQuery(pokemonData: PokemonResponse) {
  return useInfiniteQuery<PokemonResponse, Error, PokemonResponse>({
    queryKey: ["pokemons"],
    queryFn: async ({ pageParam = 0 }) => {
      const pokemons = await getPokemons(pageParam);
      return pokemons;
    },
    initialPageParam: 0,
    initialData: {
      pages: [pokemonData],
      pageParams: [pokemonData.nextOffset],
    },

    getNextPageParam: (lastPage) => {
      return lastPage.nextOffset;
    },

    select: (data) => ({
      pokemons: data.pages.flatMap((page) => page.pokemons),
      nextOffset: data.pages[data.pages.length - 1]?.nextOffset,
      pages: data.pages,
      pageParams: data.pageParams,
    }),

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}
