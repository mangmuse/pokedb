import { getPokemons } from "@/api/pokemon.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePokemonsQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 0 }) => {
      const pokemons = getPokemons(pageParam);

      return pokemons;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages, d) => {
      return lastPage.nextOffset ? lastPage.nextOffset : undefined;
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
