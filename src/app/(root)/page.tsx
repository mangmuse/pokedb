import PokemonList from "@/components/PokemonList";

export default function HomePage() {
  return (
    <section className="">
      <h1 className="text-3xl text-white mt-6 text-center">포켓몬 도감</h1>
      <PokemonList />
    </section>
  );
}
