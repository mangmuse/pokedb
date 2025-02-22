import Button from "@/components/Button";
import Link from "next/link";

export default function PokemonDetailNav({ pokemonId }: { pokemonId: string }) {
  const pokemonIdNumber = Number(pokemonId);
  const nextPokemonPage = `/${pokemonIdNumber + 1}`;
  const prevPokemonPage = `/${pokemonIdNumber - 1}`;
  return (
    <nav className="flex items-center gap-3 mt-1">
      <Link href={prevPokemonPage}>
        <Button bgColor="bg-blue-500" isDisabled={pokemonIdNumber < 2}>
          이전 포켓몬
        </Button>
      </Link>

      <Link href="/">
        <Button bgColor="bg-gray-500">목록으로</Button>
      </Link>

      <Link href={nextPokemonPage}>
        <Button bgColor="bg-blue-500" isDisabled={pokemonIdNumber > 1008}>
          다음 포켓몬
        </Button>
      </Link>
    </nav>
  );
}
