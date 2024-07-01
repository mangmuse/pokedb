"use client";

import { TPokemon } from "@/types/pokemons.type";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: TPokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.id.toString()} //Todo: 이름같은걸로 바꾸기
        width={200}
        height={200}
      />
      {pokemon.korean_name} (#{pokemon.id}) - {pokemon.korean_name} - Height:
      {pokemon.height} - Weight: {pokemon.weight}
      {pokemon.types.map((type, idx) => (
        <span key={idx}>{type.type.name}</span>
      ))}
    </>
  );
}
