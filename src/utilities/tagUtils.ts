import { Country, TagT } from '../types';
import { getColor } from './colorUtils';

const getTags = (countries: Country[]): TagT[] => countries.map((country, index) => ({
  id: index,
  label: country.name ?? '',
  value: getColor(index),
}));

export default getTags;
