import { calcCountries, getCountriesList, sumPeriodData } from "lib";

import { Countries, DataPageState } from "../@types";

export const useGetDetailedData = (
  data: GatsbyTypes.Maybe<GatsbyTypes.SitePageContextData>,
  periodLength: number
): DataPageState => {
  const countries = calcCountries(data as Countries, periodLength);
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
