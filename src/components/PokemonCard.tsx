"use client";

import { TPokemon } from "@/types/pokemons.type";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: TPokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article className="p-4 bg-gray-100 rounded-lg shadow-lg hover:scale-105 transition-all ">
      <div className="relative w-full h-48 ">
        <Image
          className=" object-cover bg-gray-200 outline outline-gray-300 rounded-lg"
          src={pokemon.sprites.front_default}
          alt={pokemon.id.toString()} //Todo: 이름같은걸로 바꾸기
          layout="fill"
        />
      </div>
      <div className="flex flex-col items-center p-4">
        <h3 className="text-lg font-bold">{pokemon.korean_name}</h3>
        <p className="w-full truncate text-center">asd</p>
        <span className="text-sm rounded-lg bg-green-100 px-2 my-2">
          도감번호 {pokemon.id}
        </span>
      </div>
    </article>
  );
}
