import { Countries } from '../types';
import getCountry from '../utilities/countryUtils';
import 
const countriesMapdata = (data: Countries | undefined) => {
  // above - fetch GeoJson Data

  // construct geoJSON object with Countries (prosess exclusions for vessels)

  const { data = [] } = response;
  const hasData = Array.isArray(data) && data.length > 0;

  if (!hasData) return;

  const geoJson = {
    type: 'FeatureCollection',
    features: data.map((country = {}) => {
      const { countryInfo = {} } = country;
      const { lat, long: lng } = countryInfo;
      return {
        type: 'Feature',
        properties: {
          ...country,
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      };
    }),
  };

  // process and transform
  const result = [];
  return result;
};

export default countriesMapdata;
