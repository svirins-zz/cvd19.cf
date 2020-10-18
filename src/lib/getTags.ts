import { Country, Tags } from '../@types';
import { getColor } from './calcColor';

const getTags = (countries: Country[]): Tags[] => countries.map((country, index) => ({
  id: index,
  label: country.name ?? '',
  value: getColor(index),
}));

export default getTags;
