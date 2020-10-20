import { COLORS } from 'const';
import { OutbreakStatus, Tags } from '../@types';

export const calcTagstyle = (rate: OutbreakStatus): string => {
  let color = 'none';
  switch (rate) {
    case 'No Outbreak': { color = 'grey'; break; }
    case 'Small Outbreak': { color = 'pink'; break; }
    case 'Losing': { color = 'red'; break; }
    case 'Flattening the Curve': { color = 'volcano'; break; }
    case 'Crushing the Curve': { color = 'orange'; break; }
    case 'Winning': { color = 'cyan'; break; }
    case 'Won': { color = 'green'; break; }
    default: { color = 'grey'; }
  }
  return color;
};

export const getColor = (index: number): string => {
  const colorNum = index < 7 ? index : index % 7;
  return COLORS[colorNum];
};

// TODO: double check refactoring find -> filter
export const getColorByCountryName = (countryName: string, countriesArray: Tags[]): string => (
  countriesArray.filter((e) => e.label === countryName)[0].value
);
