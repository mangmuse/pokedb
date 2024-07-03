"use client";

import { TPokemon } from "@/types/pokemons.type";
import Image from "next/image";
import SpanItem from "./Spanitem";

interface PokemonCardProps {
  pokemon: TPokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article className="p-4 bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all pb-0 ">
      <div className="flex justify-center relative w-full h-48 outline outline-gray-300 rounded-lg ">
        <Image
          className=" bg-cover "
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={192}
          height={192}
        />
      </div>
      <div className="flex flex-col items-center p-4">
        <SpanItem bold bgColor="bg-red-100">
          {pokemon.id}번째 포켓몬
        </SpanItem>
        <h3 className="text-lg font-bold mt-1">{pokemon.korean_name}</h3>
      </div>
    </article>
  );
}
