"use client";

import { TPokemon } from "@/types/pokemons.type";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: TPokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article className="p-4 bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all pb-0 ">
      <div className="relative w-full h-48 ">
        <Image
          className=" object-cover outline outline-gray-300 rounded-lg"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col items-center p-4">
        <span className="text-sm rounded-lg bg-green-100 px-2 mb-0-2">
          도감번호 {pokemon.id}
        </span>
        <h3 className="text-lg font-bold">{pokemon.korean_name}</h3>
      </div>
    </article>
  );
}
