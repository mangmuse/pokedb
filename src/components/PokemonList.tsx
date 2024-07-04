"use client";

import PokemonCard from "./PokemonCard";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import usePokemonsQuery from "@/hooks/usePokemonsQuery";
import Loading from "@/app/(root)/loading";
import { PokemonResponse } from "@/api/pokemon.api";

export default function PokemonList({
  initialPokemonList,
}: {
  initialPokemonList: PokemonResponse;
}) {
  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonsQuery(initialPokemonList);
  console.log(initialPokemonList);
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isPending) return <Loading />;
  return (
    <div>
      <ul className="p-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/${pokemon.id}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </li>
        ))}
      </ul>
      <div ref={ref}></div>
    </div>
  );
}
