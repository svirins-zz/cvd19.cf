import { calcCountries, getCountriesList, sumPeriodData } from "lib";

import { Countries, CountriesList, Country } from "../@types";

export const useGetDetailedData = (
  data: GatsbyTypes.Maybe<GatsbyTypes.SitePageContextData>,
  periodLength: number
) => {
  const countries: Country[] = calcCountries(data as Countries, periodLength);
  const countriesList: CountriesList[] = getCountriesList(countries);
  const preparedCountries: Country[] = [
    ...countries,
    ...sumPeriodData(countries, periodLength),
  ];
  return {
    countriesList,
    preparedCountries,
  };
};
