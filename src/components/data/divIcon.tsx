import "leaflet/dist/leaflet.css";
import { DivIcon, divIcon } from "leaflet";
import { getClassNameByCase, commafy } from "lib";

export const DivIconMarker = (confirmed: number): DivIcon => {
  return divIcon({
    html: `<p class="markerText">${commafy(confirmed)}</p>`,
    className: `${getClassNameByCase(confirmed)} icon-marker`,
  });
};
