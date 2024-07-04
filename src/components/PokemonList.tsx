"use client";

import PokemonCard from "./PokemonCard";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import usePokemonsQuery from "@/hooks/usePokemonsQuery";
import { PokemonResponse } from "@/api/pokemon.api";
import Loading from "@/app/(root)/loading";

export default function PokemonList({
  pokemonData,
}: {
  pokemonData: PokemonResponse;
}) {
  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonsQuery(pokemonData);
  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (error) {
    return <div className="text-white">Error: {error.message}</div>;
  }

  return (
    <div>
      <ul className="p-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {data?.pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/${pokemon.id}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </li>
        ))}
      </ul>
      {isFetching && <Loading />}
      <div className="text-white" ref={ref}></div>
    </div>
  );
}
