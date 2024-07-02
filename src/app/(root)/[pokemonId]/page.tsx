import { TPokemon } from "@/types/pokemons.type";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface PokemonDetailPageProps {
  params: {
    pokemonId: string;
  };
}
const getPokemonData = async (pokemonId: string): Promise<TPokemon<true>> => {
  const { data } = await axios.get<TPokemon<true>>(
    `http://localhost:3000/api/pokemons/${pokemonId}`,
    { params: { pokemonId } }
  );
  return data;
};

export default async function PokemonDetailPage({
  params: { pokemonId },
}: PokemonDetailPageProps) {
  const pokemon = await getPokemonData(pokemonId);

  return (
    <div className="h-full flex justify-center items-center  ">
      <section className="max-w-screen-sm bg-gray-100 rounded-xl">
        <header className=" p-5 flex flex-col items-center bg-gray-200 rounded-xl">
          <h3 className="text-2xl font-semibold"> {pokemon.korean_name}</h3>
          <span>No. {pokemon.id}</span>
        </header>
        <article className="flex flex-col items-center p-4 ">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.id.toString()}
            width={150}
            height={150}
          ></Image>
          <h3>이름: {pokemon.korean_name}</h3>
          <p>
            키: {pokemon.height} m 무게: {pokemon.weight} kg
          </p>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">타입: </span>
              <ul className="flex items-center gap-1">
                {pokemon.types.map((type, idx) => (
                  <li
                    className="text-sm rounded-lg bg-red-400 px-2 leading-5"
                    key={idx}
                  >
                    {type.type.korean_name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 ">
              <span className="font-semibold ">특성: </span>
              <ul className="flex  items-center gap-1">
                {pokemon.abilities.map((abil) => (
                  <p
                    key={abil.ability.korean_name}
                    className="text-sm rounded-lg bg-green-300 px-2"
                  >
                    {abil.ability.korean_name}
                  </p>
                ))}
              </ul>
            </div>
          </div>
          <ul className="flex flex-wrap gap-1 overflow-auto mt-2">
            {pokemon.moves.map((move) => (
              <span className="text-sm" key={move.move.korean_name}>
                {move.move.korean_name}
              </span>
            ))}
          </ul>
          <Link
            className="text-white bg-blue-500 px-3 py-1 rounded-md mt-2"
            href="/"
          >
            목록으로
          </Link>
        </article>
      </section>
    </div>
  );
}
