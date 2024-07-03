import { TPokemon } from "@/types/pokemons.type";

export default function PokemonDetailHeader({
  pokemon,
}: {
  pokemon: TPokemon<true>;
}) {
  return (
    <header className=" p-5 flex flex-col items-center bg-gray-200 rounded-xl">
      <h3 className="text-2xl font-semibold"> {pokemon.korean_name}</h3>
      <span>No. {pokemon.id}</span>
    </header>
  );
}
