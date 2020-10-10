import { OutbreakStatus } from '../types';

const calcTagstyle = (rate: OutbreakStatus): string => {
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
export default calcTagstyle;
