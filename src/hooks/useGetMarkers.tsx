import { DivIcon } from "leaflet";
import { commafy, getFeatures, getMarkerDetails } from "lib";
import React from "react";
import { Marker, Popup } from "react-leaflet";

import { Countries } from "../@types";

export const useGetMarkers = (
  data: GatsbyTypes.Maybe<GatsbyTypes.SitePageContextData>
) => {
  const { features } = getFeatures(data as Countries);
  const markers = features.map((feature, index) => {
    const { name, flag, confirmed, deaths, recovered } = feature.properties;
    const icon = new DivIcon({
      html: `<div class="icon-marker ${getMarkerDetails(confirmed)}">
          <p class="marker-text">${commafy(confirmed)}</p>
        </div>`,
    });
    return (
      <Marker
        key={index}
        position={feature.geometry.coordinates}
        icon={icon}
        eventHandlers={{
          click: () => {
            // process fly to
          },
        }}
      >
        <Popup key={index}>
          <span>
            <img src={flag} alt="name" />
            <h2 className="title">{name}</h2>
            <ul className="marker-list">
              <li>Confirmed:&nbsp;{commafy(confirmed)}</li>
              <li>Deaths:&nbsp;{commafy(deaths)}</li>
              <li>Recovered:&nbsp;{commafy(recovered)}</li>
            </ul>
          </span>
        </Popup>
      </Marker>
    );
  });
  return { markers };
};
