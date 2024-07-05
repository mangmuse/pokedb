"use client";

import { TPokemon } from "@/types/pokemons.type";
import Image from "next/image";
import SpanItem from "../../../components/Spanitem";
import { formatPokemonId } from "@/util/pokemonNumberFormatUtils";

interface PokemonCardProps {
  pokemon: TPokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const formattedPokemonId = formatPokemonId(pokemon.id);
  return (
    <article className="p-4 bg-gray-100 rounded-xl shadow-lg hover:scale-105 transition-all pb-0 ">
      <div className="flex justify-center relative  h-48   ">
        <Image
          className=" bg-cover "
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
          width={150}
          height={150}
        />
      </div>
      <div className="flex flex-col items-center p-4">
        <SpanItem bold bgColor="bg-red-100">
          도감번호 No.{pokemon.id}
        </SpanItem>
        <h3 className="text-lg font-bold mt-1">{pokemon.korean_name}</h3>
      </div>
    </article>
  );
}
