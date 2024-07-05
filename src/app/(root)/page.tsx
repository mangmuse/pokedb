import { pokemonOptions } from "@/api/pokemonPrefetchQueryOptions";
import PokemonList from "@/app/(root)/_components/PokemonList";
import {
  HydrationBoundary,
  QueryClient,
  defaultShouldDehydrateQuery,
  dehydrate,
} from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });

  await queryClient.prefetchInfiniteQuery(pokemonOptions);
  return (
    <section className="">
      <h1 className="p-10 text-4xl text-white mt-6 text-center">포켓몬 도감</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonList />
      </HydrationBoundary>
    </section>
  );
}
