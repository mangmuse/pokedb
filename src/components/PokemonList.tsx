"use client";

import { getPokemons } from "@/api/pokemon.api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PokemonCard from "./PokemonCard";
import { TPokemon } from "@/types/pokemons.type";
import Link from "next/link";

export default function PokemonList() {
  const { data, isPending, error } = useQuery<TPokemon[], Error>({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul className=" p-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/${pokemon.id}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
