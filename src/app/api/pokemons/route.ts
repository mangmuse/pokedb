import { NextResponse } from "next/server";
import axios from "axios";
import {
  TPokemon,
  TPokemonBaseInfoResponse,
  TSpeciesResponse,
} from "@/types/pokemons.type";

const TOTAL_POKEMON = 151;

export const GET = async (request: Request): Promise<NextResponse | Error> => {
  try {
    const allPokemonPromises = Array.from(
      { length: TOTAL_POKEMON },
      (_, index) => {
        const id = index + 1;
        return Promise.all([
          axios.get<TPokemonBaseInfoResponse>(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          ),
          axios.get<TSpeciesResponse>(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          ),
        ]);
      }
    );

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData: TPokemon[] = allPokemonResponses.map(
      ([response, speciesResponse], index) => {
        const pokemonDetail = response.data;
        const koreanNames = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        );
        const koreanName = koreanNames?.name;
        return { ...pokemonDetail, korean_name: koreanName || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
