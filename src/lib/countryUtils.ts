import { getCode } from 'country-list';
import { MISSING_COUNTRIES, ALL_COUNTRIES_DATA } from '../const';
import vessel from '../assets/vessel.svg'
import { Geometry, CodeFlagGeo, CoordTuple } from '../types';

const getMissingCode = (countryName: String): string => {
  const element = MISSING_COUNTRIES.find((el) => el.longName === countryName);
  return element.shortName;
};
// TODO: 2 vessels - 1 point fix it!
const getCoords = (code: string): CoordTuple => {
  if (code === 'VESSEL') { return [-38, 47]; }
  const element = ALL_COUNTRIES_DATA.find((e) => e.country_code === code);
  // console.log(element.latlng)
  return [Number(element.latlng[1]), Number(element.latlng[0])];
  // return [1,1]
};

const getCountryExtData = (countryName: string): CodeFlagGeo => {
  const code = !getCode(countryName) ? getMissingCode(countryName) : getCode(countryName);
  const flag = code === 'VESSEL' ? vessel : `https://www.countryflags.io/${code?.toLowerCase()}/flat/32.png`;
  const geometry: Geometry = {
    type: 'Point',
    coordinates: getCoords(code),
  };
  return { code, flag, geometry };
};

export default getCountryExtData;
