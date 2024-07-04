import PokemonList from "@/components/PokemonList";
import Loading from "./loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";
// import PokemonList from "@/components/PokemonList";
import { getPokemons } from "@/api/pokemon.api";
import {
  HydrationBoundary,
  QueryClient,
  defaultShouldDehydrateQuery,
  dehydrate,
} from "@tanstack/react-query";
import { pokemonOptions } from "@/api/pokemonOptions";

// const PokemonList = dynamic(() => import("@/components/PokemonList"), {
//   ssr: false,
//   loading: () => <Loading />,
// });

// export const pokemonOptions = queryOptions({
//   queryKey: ["pokemons"],
//   queryFn: async () => {
//     const res = await getPokemons();
//     return res;
//   },
// });
export default async function HomePage() {
  const data = await getPokemons();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
  await queryClient.prefetchInfiniteQuery(pokemonOptions);
  return (
    <section className="">
      <h1 className="text-3xl text-white mt-6 text-center">포켓몬 도감</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonList pokemonData={data} />
      </HydrationBoundary>
    </section>
  );
}
