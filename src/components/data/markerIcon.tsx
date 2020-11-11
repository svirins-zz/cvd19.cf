import { commafy, getSvgMarkerDetails } from "lib";

export const MarkerIcon = (confirmed: number) => {
  const {class, width} = getSvgMarkerDetails(confirmed)
  return MarkerIcon({
    html: `<p class="markerText">${commafy(confirmed)}</p>`,
    className: `${getClassNameByCase(confirmed)} icon-marker`,
  });
};
