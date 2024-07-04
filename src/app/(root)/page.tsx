// import PokemonList from "@/components/PokemonList";
import Loading from "./loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PokemonList from "@/components/PokemonList";
import { getPokemons } from "@/api/pokemon.api";

// const PokemonList = dynamic(() => import("@/components/PokemonList"), {
//   ssr: false,
// });
export const revalidate = 3600;
export default async function HomePage() {
  const initialPokemonList = await getPokemons();
  console.log(initialPokemonList);
  return (
    <section className="">
      <h1 className="text-3xl text-white mt-6 text-center">포켓몬 도감</h1>
      <Suspense fallback={<Loading />}>
        <PokemonList initialPokemonList={initialPokemonList} />
      </Suspense>
    </section>
  );
}
