import { OutbreakStatus, Tags } from '../types';
import { COLORS } from '../const';

export const calcTagstyle = (rate: OutbreakStatus): string => {
  let color = 'none';
  switch (rate) {
    case 'No Outbreak': { color = 'gray'; break; }
    case 'Small Outbreak': { color = 'pink'; break; }
    case 'Losing': { color = 'red'; break; }
    case 'Flattening the Curve': { color = 'orange'; break; }
    case 'Crushing the Curve': { color = 'yellow'; break; }
    case 'Winning': { color = 'cyan'; break; }
    case 'Won': { color = 'green'; break; }
    default: { color = 'gray'; }
  }
  return color;
};

export const getColor = (index: number): string => {
  const colorNum = index < 7 ? index : index % 7;
  return COLORS[colorNum];
};

// TODO:move to apollo client cache!
export const getColorByCountryName = (countryName: string, countriesArray: Tags[]): string => (
  countriesArray.find((e) => e.label === countryName).value
);
