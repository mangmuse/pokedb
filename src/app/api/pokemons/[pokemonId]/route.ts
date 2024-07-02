import {
  TPokemon,
  TPokemonBaseInfoResponse,
  TSpeciesResponse,
} from "@/types/pokemons.type";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { pokemonId: string } }
): Promise<NextResponse | void> => {
  const { pokemonId } = params;

  try {
    const response = await axios.get<TPokemonBaseInfoResponse>(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    console.log(response);
    const speciesResponse = await axios.get<TSpeciesResponse>(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );

    const koreanName = speciesResponse.data.names?.find(
      (name) => name.language.name === "ko"
    );

    const typesWithKoreanNames = await Promise.all(
      response.data.types.map(async (type) => {
        const typeResponse = await axios.get<TSpeciesResponse>(type.type.url);
        const koreanTypeName =
          typeResponse.data.names?.find((name) => name.language.name === "ko")
            ?.name || type.type.name;
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      })
    );

    const abilitiesWithKoreanNames = await Promise.all(
      response.data.abilities.map(async (ability) => {
        const abilityResponse = await axios.get<TSpeciesResponse>(
          ability.ability.url
        );
        const koreanAbilityName =
          abilityResponse.data.names?.find(
            (name) => name.language.name === "ko"
          )?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      })
    );

    const movesWithKoreanNames = await Promise.all(
      response.data.moves.map(async (move) => {
        const moveResponse = await axios.get<TSpeciesResponse>(move.move.url);
        const koreanMoveName =
          moveResponse.data.names?.find((name) => name.language.name === "ko")
            ?.name || move.move.name;
        return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
      })
    );

    const pokemonData: TPokemon<true> = {
      ...response.data,
      korean_name: koreanName?.name || speciesResponse.data.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
    };
    console.log(pokemonData);
    console.log("asdasdasdasd");
    return NextResponse.json(pokemonData);
  } catch (error) {
    // console.error("Error fetching Pokemon data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
