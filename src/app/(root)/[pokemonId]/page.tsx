import { TPokemon } from "@/types/pokemons.type";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlablaList from "./_components/PokemonTypeAndAbilityList";
import PokemonDetailHeader from "./_components/PokemonDetailHeader";
import { getPokemonData } from "@/api/pokemon.api";
import Spanitem from "@/components/Spanitem";
import { redirect } from "next/navigation";
import PokemonDetailNav from "./_components/PokemonDetailNav";
import {
  formatPokemonHeight,
  formatPokemonWeight,
} from "@/util/pokemonNumberFormatUtils";
import PokemonTypeAndAbilityList from "./_components/PokemonTypeAndAbilityList";

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

  if (!pokemon) redirect("/");

  const formattedWeight = formatPokemonWeight(pokemon.weight);
  const formattedHeight = formatPokemonHeight(pokemon.height);

  return (
    <div className="h-screen flex justify-center items-center  ">
      <section className="max-h-screen max-w-screen-sm bg-gray-100 rounded-xl overflow-auto  ">
        <PokemonDetailHeader pokemon={pokemon} />
        <article className="flex flex-col items-center p-4 ">
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            width={150}
            height={150}
            priority
          ></Image>
          <h3 className="text-xl mb-2 font-semibold">{pokemon.korean_name}</h3>
          <p>
            키: {formattedHeight}cm 몸무게: {formattedWeight}kg
          </p>

          <PokemonTypeAndAbilityList pokemon={pokemon} title="타입" />
          <PokemonTypeAndAbilityList pokemon={pokemon} title="능력" />

          <ul className="flex max-h-48 flex-wrap gap-1 mt-4 overflow-auto">
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
