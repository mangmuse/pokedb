export function formatPokemonId(number: number): string {
  return number.toString().padStart(4, "0");
}
