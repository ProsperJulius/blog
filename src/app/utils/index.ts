const shuffled = <T>(array: T[]) => {
  return array.sort(() => 0.5 - Math.random());
};
const getThreeRandomCountries = <T>(array: T[]) => {
  return shuffled(array).slice(0, 3);
};
const capitalizeFirstLetter = (word: string) => {

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const HelperFunctions = { shuffled, getThreeRandomCountries, capitalizeFirstLetter };
