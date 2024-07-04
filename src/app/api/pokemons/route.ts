import { NextResponse } from "next/server";
import axios from "axios";
import {
  TPokemon,
  TPokemonBaseInfoResponse,
  TPokemonPageResponse,
  TSpeciesResponse,
} from "@/types/pokemons.type";

const TOTAL_POKEMON = 1008;
const POKEMONS_PER_PAGE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = parseInt(POKEMONS_PER_PAGE.toString());

  try {
    const response = await axios.get<TPokemonPageResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const pokemonResults = response.data.results;
    const allPokemonPromises = pokemonResults.map((pokemon) => {
      const urlParts = pokemon.url.split("/");
      const id = urlParts[urlParts.length - 2];
      return Promise.all([
        axios.get<TPokemonBaseInfoResponse>(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        ),
        axios.get<TSpeciesResponse>(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        ),
      ]);
    });

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData: TPokemon[] = allPokemonResponses.map(
      ([response, speciesResponse]) => {
        const pokemonDetail = response.data;
        const koreanNames = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        );

        const koreanName = koreanNames?.name;
        return {
          ...pokemonDetail,
          name: speciesResponse.data.name,
          korean_name: koreanName || null,
        };
      }
    );

    return NextResponse.json({
      pokemons: allPokemonData,
      nextOffset: offset + limit < TOTAL_POKEMON ? offset + limit : null,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
