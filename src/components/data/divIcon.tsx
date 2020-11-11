import "leaflet/dist/leaflet.css";

import { divIcon } from "leaflet";
import { commafy, getClassNameByCase } from "lib";

export const DivIconMarker = (confirmed: number) => {
  return divIcon({
    html: `<p class="markerText">${commafy(confirmed)}</p>`,
    className: `${getClassNameByCase(confirmed)} icon-marker`,
  });
};
