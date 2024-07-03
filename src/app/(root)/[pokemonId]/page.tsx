import { TPokemon } from "@/types/pokemons.type";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlablaList from "./_components/BlablaList";
import PokemonDetailHeader from "./_components/PokemonDetailHeader";
import { getPokemonData } from "@/api/pokemon.api";
import Spanitem from "@/components/Spanitem";
import { redirect } from "next/navigation";
import PokemonDetailNav from "./_components/PokemonDetailNav";

interface PokemonDetailPageProps {
  params: {
    pokemonId: string;
  };
}

export async function generateMetadata({
  params: { pokemonId },
}: PokemonDetailPageProps): Promise<Metadata> {
  const data = await getPokemonData(pokemonId);

  return {
    title: `PokeDB | ${data?.korean_name}의 상세정보`,
    description: `${data?.korean_name}의 타입, 특성 기술등의 상세정보`,
  };
}

export default async function PokemonDetailPage({
  params: { pokemonId },
}: PokemonDetailPageProps) {
  const pokemon = await getPokemonData(pokemonId);

  if (!pokemon) redirect("/"); // Todo

  return (
    <div className="h-full flex justify-center items-center  ">
      <section className="max-w-screen-sm bg-gray-100 rounded-xl">
        <PokemonDetailHeader pokemon={pokemon} />
        <article className="flex flex-col items-center p-4 ">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
          ></Image>
          <h3 className="text-xl mb-2 font-semibold">{pokemon.korean_name}</h3>
          <p>
            키: {pokemon.height} m 무게: {pokemon.weight} kg
          </p>

          <BlablaList pokemon={pokemon} title="타입" />
          <BlablaList pokemon={pokemon} title="능력" />

          <ul className="flex flex-wrap gap-1 overflow-auto mt-2">
            {pokemon.moves.map((move) => (
              <li key={move.move.korean_name}>
                <Spanitem bgColor="bg-gray-300">
                  {move.move.korean_name}
                </Spanitem>
              </li>
            ))}
          </ul>
          <PokemonDetailNav pokemonId={pokemonId} />
        </article>
      </section>
    </div>
  );
}
