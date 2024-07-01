"use client";

import { getPokemons } from "@/api/pokemon.api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PokemonCard from "./PokemonCard";
import { TPokemon } from "@/types/pokemons.type";

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
      <ul>
        {data?.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </div>
  );
}
