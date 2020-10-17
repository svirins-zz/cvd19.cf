import L from 'leaflet';

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

export function promiseToFlyTo(map, { zoom, center }) {
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

export function trackerFeatureToHtmlMarker({ properties = {} } = {}) {
  const {
    name, flag, confirmed, deaths, recovered,
  } = properties;
  let header = name;

  if (flag) {
    header = `<img src="${flag}" name="flag"> ${header}`;
  }

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

  // TODO: consider adding commafy to values or adjusting circle radius
  // stats = stats.map((stat) => {
  //   const value = stat?.value;

  //   if (!value) return stat;

  //   let newValue = value;

  //   if (stat?.type === 'number') {
  //     newValue = commafy(value);
  //     if (value > 999999) {
  //       newValue = `${newValue.slice(0, -8)}m+`;
  //     } else if (value > 999) {
  //       newValue = `${newValue.slice(0, -4)}k+`;
  //     }
  //   } else if (stat?.type === 'date') {
  //     newValue = friendlyDate(newValue);
  //   }

  //   return {
  //     ...stat,
  //     value: newValue,
  //   };
  // });

  let statsString = '';

  stats.forEach(({ label, value }) => {
    statsString = `
      ${statsString}
      <li><strong>${label}:</strong> ${value}</li>
    `;
  });

  const casesString = stats.find(({ label }) => label === 'Confirmed')?.value;

  return `
    <span class="icon-marker">
      <span class="icon-marker-tooltip">
        <h2>${header}</h2>
        <ul>${statsString}</ul>
      </span>
      ${casesString}
    </span>
  `;
}

export function geoJsonToMarkers(geoJson, options) {
  console.log(options)
  return new L.GeoJSON(geoJson, {
    pointToLayer: pointToLayerMarkerCreator(options),
  });
}
