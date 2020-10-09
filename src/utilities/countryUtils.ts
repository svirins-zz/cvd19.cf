import { getCode } from 'country-list';
import MISSING_COUNTRIES from '../const';

const getMissingCode = (countryName: String) => {
  const element = MISSING_COUNTRIES.find((el) => el.longName === countryName);
  return element?.shortName;
};

const getCountry = (countryName: string): string | undefined => (
  !getCode(countryName) ? getMissingCode(countryName) : getCode(countryName)
);

export default getCountry;
