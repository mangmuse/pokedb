import Spanitem from "@/components/Spanitem";
import { TPokemon } from "@/types/pokemons.type";

interface BlablaListProps {
  pokemon: TPokemon<true>;
  title: string;
}

export default function PokemonTypeAndAbilityList({
  pokemon,
  title,
}: BlablaListProps) {
  const isType = title === "타입";
  const items = isType ? pokemon.types : pokemon.abilities;
  const bgColor = isType ? "bg-red-400" : "bg-green-300";

  return (
    <div className="flex gap-2 mt-1">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{title}: </span>
        <ul className="flex items-center gap-1">
          {items.map((item, idx) => (
            <li key={idx}>
              <Spanitem bold bgColor={bgColor}>
                {isType ? item.type.korean_name : item.ability.korean_name}
              </Spanitem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
