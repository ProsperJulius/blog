const shuffled = <T>(array: T[]) => {
    return array.sort(() => 0.5 - Math.random());
  };
  const getThreeRandomCountries = <T>(array: T[]) => {
    return shuffled(array).slice(0, 3);
  };
  export const HelperFunctions = { shuffled, getThreeRandomCountries };
  