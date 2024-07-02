// import { NextResponse } from "next/server";
// import axios from "axios";
// import {
//   TPokemon,
//   TPokemonBaseInfoResponse,
//   TSpeciesResponse,
// } from "@/types/pokemons.type";

// const TOTAL_POKEMON = 151;

// export const GET = async (request: Request): Promise<NextResponse | Error> => {
//   try {
//     const allPokemonPromises = Array.from(
//       { length: TOTAL_POKEMON },
//       (_, index) => {
//         const id = index + 1;
//         return Promise.all([
//           axios.get<TPokemonBaseInfoResponse>(
//             `https://pokeapi.co/api/v2/pokemon/${id}`
//           ),
//           axios.get<TSpeciesResponse>(
//             `https://pokeapi.co/api/v2/pokemon-species/${id}`
//           ),
//         ]);
//       }
//     );

//     const allPokemonResponses = await Promise.all(allPokemonPromises);

//     const allPokemonData: TPokemon[] = allPokemonResponses.map(
//       ([response, speciesResponse], index) => {
//         const pokemonDetail = response.data;
//         const koreanNames = speciesResponse.data.names.find(
//           (name) => name.language.name === "ko"
//         );
//         const koreanName = koreanNames?.name;
//         return { ...pokemonDetail, korean_name: koreanName || null };
//       }
//     );

//     return NextResponse.json(allPokemonData);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch data" });
//   }
// };

import { NextResponse } from "next/server";
import axios from "axios";
import {
  TPokemon,
  TPokemonBaseInfoResponse,
  TPokemonPage,
  TSpeciesResponse,
} from "@/types/pokemons.type";

// const TOTAL_POKEMON = 1301;
const TOTAL_POKEMON = 1008;
const POKEMONS_PER_PAGE = 24;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = parseInt(
    // searchParams.get("limit") ||
    POKEMONS_PER_PAGE.toString()
  );

  try {
    const response = await axios.get<TPokemonPage>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const pokemonResults = response.data.results;
    console.log(pokemonResults);
    const allPokemonPromises = pokemonResults.map((pokemon) => {
      console.log(pokemon.url);
      const urlParts = pokemon.url.split("/");
      console.log(urlParts);
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
        return { ...pokemonDetail, korean_name: koreanName || null };
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
