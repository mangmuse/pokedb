"use client";

import PokemonCard from "./PokemonCard";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import usePokemonsQuery from "@/hooks/usePokemonsQuery";

export default function PokemonList() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonsQuery();
  const { ref } = useInView({
    threshold: 1,
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
