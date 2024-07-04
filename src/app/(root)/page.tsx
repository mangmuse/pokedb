// import PokemonList from "@/components/PokemonList";
import Loading from "./loading";
import dynamic from "next/dynamic";
// import PokemonList from "@/components/PokemonList";

const PokemonList = dynamic(() => import("@/components/PokemonList"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function HomePage() {
  return (
    <section className="">
      <h1 className="text-3xl text-white mt-6 text-center">포켓몬 도감</h1>
      <PokemonList />
    </section>
  );
}
