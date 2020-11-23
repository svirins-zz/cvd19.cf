import { calcCountries, getCountriesList, sumPeriodData } from "lib";

import { Country, DataPageState } from "../@types";

export const useGetDetailedData = (
  data: Country[],
  periodLength: number
): DataPageState => {
  const countries = calcCountries(data, periodLength);
  const countriesList = getCountriesList(countries);
  const preparedCountries = [
    ...countries,
    ...sumPeriodData(countries, periodLength),
  ];
  return {
    countriesList,
    preparedCountries,
  };
};
