import { TPokemon } from "@/types/pokemons.type";

interface BlablaListProps {
  pokemon: TPokemon<true>;
  title: string;
}

export default function BlablaList({ pokemon, title }: BlablaListProps) {
  const isType = title === "타입";
  const items = isType ? pokemon.types : pokemon.abilities;
  const bgColor = isType ? "bg-red-400" : "bg-green-300";

  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{title}: </span>
        <ul className="flex items-center gap-1">
          {items.map((item, idx) => (
            <li
              className={`text-sm rounded-lg ${bgColor} px-2 leading-5`}
              key={idx}
            >
              {isType ? item.type.korean_name : item.ability.korean_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
