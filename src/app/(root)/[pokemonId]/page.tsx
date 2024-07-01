import { TPokemon } from "@/types/pokemons.type";
import axios from "axios";
import Image from "next/image";

interface PokemonDetailPageProps {
  params: {
    pokemonId: string;
  };
}
const getPokemonData = async (pokemonId: string): Promise<TPokemon<true>> => {
  const { data } = await axios.get<TPokemon<true>>(
    `http://localhost:3001/api/pokemons/${pokemonId}`,
    { params: { pokemonId } }
  );
  return data;
};

export default async function PokemonDetailPage({
  params: { pokemonId },
}: PokemonDetailPageProps) {
  const pokemon = await getPokemonData(pokemonId);

  return (
    <div className="text-white">
      <section className="">
        <h3 className="text-3xl ">이건 특성</h3>
        {pokemon.abilities.map((abil) => abil.ability.korean_name)}
        <div>이건 키 {pokemon.height}</div>
        <div>이건 도감번호 {pokemon.id}</div>
        <div>이건 이름 {pokemon.korean_name}</div>
        <div className="flex gap-8">
          <h3 className="text-3xl">이건 기술</h3>
          <span> {pokemon.moves.map((move) => move.move.korean_name)}</span>
        </div>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.id.toString()}
          width={300}
          height={300}
        ></Image>
        <div>
          <h3 className="text-3xl">이건타입</h3>
          {pokemon.types.map((type) => (
            <span>{type.type.korean_name}</span>
          ))}
        </div>
        <div>{pokemon.weight}</div>
      </section>
    </div>
  );
}
