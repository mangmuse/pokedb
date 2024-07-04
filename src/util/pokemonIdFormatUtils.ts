export function formatPokemonId(number: number): string {
  return number.toString().padStart(4, "0");
}

export function formatPokemonWeight(number: number) {
  const formattedWeight = (number / 10).toFixed(1);
  const slicedFormattedWeight = formattedWeight.endsWith(".0")
    ? formattedWeight.slice(0, -2)
    : formattedWeight;
  return slicedFormattedWeight;
}

export function formatPokemonHeight(number: number) {
  const formattedHeight = number + "0";
  return formattedHeight;
}
