import { getCode } from 'country-list';
import { LatLngTuple } from 'leaflet';
import { MISSING_COUNTRIES, ALL_COUNTRIES_DATA, VESSELS_CURRENT_COORDS } from '../const';
import vessel from '../assets/vessel.png';
import { Geometry, CodeFlagGeo } from '../@types';

const getMissingCode = (countryName: String): string => {
  const element = MISSING_COUNTRIES.find((el) => el.longName === countryName);
  return element!.shortName;
};

const getCoords = (code: string, name: string): LatLngTuple => {
  if (name === 'MS Zaandam' || name === 'Diamond Princess') { return VESSELS_CURRENT_COORDS[name]; }
  const element = ALL_COUNTRIES_DATA.find((e) => e.country_code === code);
  return [Number(element!.latlng[1]), Number(element!.latlng[0])];
};

const getCountryExtData = (countryName: string): CodeFlagGeo => {
  const code = !getCode(countryName) ? getMissingCode(countryName) : getCode(countryName);
  const flag: string = code === 'VESSEL'
    ? vessel
    : `https://www.countryflags.io/${code?.toLowerCase()}/flat/64.png`;
  const geometry: Geometry = {
    type: 'Point',
    coordinates: getCoords(code ?? '', countryName),
  };
  return { code, flag, geometry };
};

export default getCountryExtData;
