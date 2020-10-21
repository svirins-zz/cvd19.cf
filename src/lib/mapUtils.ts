import L, { LatLngTuple } from 'leaflet';
import { Properties } from '@types';

const getClassByCases = (totalCases: number) => {
  if (totalCases < 99) { return 'icon-marker-small'; }
  if (totalCases < 9999 && totalCases > 99) { return 'icon-marker-normal'; }
  if (totalCases < 99999 && totalCases > 9999) { return 'icon-marker-large'; }
  if (totalCases < 999999 && totalCases > 99999) { return 'icon-marker-extra-large'; }
  if (totalCases > 999999) { return 'icon-marker-super-large'; }
  return '';
};

export function pointToLayerMarkerCreator({ featureToHtml, onClick } = {}) {
  return function (feature = {}, latlng) {
    let html = '<span class="icon-marker"></span>';
    if (typeof featureToHtml === 'function') {
      html = featureToHtml(feature);
    }

    function onMarkerClick(e) {
      if (typeof onClick === 'function') {
        onClick(
          {
            feature,
            latlng,
          },
          e,
        );
      }
    }

    return L.marker(latlng, {
      icon: L.divIcon({
        className: 'icon',
        html,
      }),
      riseOnHover: true,
    }).on('click', onMarkerClick);
  };
}
export function promiseToFlyTo(map, { zoom, center }: {zoom: number, center: LatLngTuple}) {
  return new Promise((resolve, reject) => {
    const baseError = 'Failed to fly to area';

    if (!map.flyTo) {
      reject(`${baseError}: no flyTo method on map`);
    }

    const mapCenter = center || map.getCenter();
    const mapZoom = zoom || map.getZoom();

    map.flyTo(mapCenter, mapZoom, {
      duration: 1,
    });

    map.once('moveend', () => {
      resolve();
    });
  });
}

export function trackerFeatureToHtmlMarker({ properties }: {properties: Properties}) {
  const {
    name, flag, confirmed, deaths, recovered,
  } = properties;
  let header = name;
  header = `<img src="${flag}" name="flag"><div>${header}</div>`;
  const stats = [
    {
      label: 'Confirmed',
      value: confirmed,
      type: 'number',
    },
    {
      label: 'Deaths',
      value: deaths,
      type: 'number',
    },
    {
      label: 'Recovered',
      value: recovered,
      type: 'number',
    },
  ];

  let statsString = '';

  stats.forEach(({ label, value }) => {
    statsString = `
      ${statsString}
      <li><strong>${label}:</strong> ${value}</li>
    `;
  });

  const casesString = stats.find(({ label }) => label === 'Confirmed')?.value;
  const iconClass = getClassByCases(confirmed);
  return `
    <span class="icon-marker ${iconClass}">
      <span class="icon-marker-tooltip">
        <h2>${header}</h2>
        <ul>${statsString}</ul>
      </span>
      ${casesString}
    </span>
  `;
}

export function geoJsonToMarkers(geoJson, options) {
  return new L.GeoJSON(geoJson, {
    pointToLayer: pointToLayerMarkerCreator(options),
  });
}
