import PokemonList from "@/components/PokemonList";
import Loading from "./loading";
import { Suspense } from "react";
export default function HomePage() {
  return (
    <section className="">
      <h1 className="text-3xl text-white mt-6 text-center">포켓몬 도감</h1>
      <Suspense fallback={<Loading />}>
        <PokemonList />
      </Suspense>
    </section>
  );
}
