import "leaflet/dist/leaflet.css";

import { Page, SEO } from "components/layout";
import { ATTRIBUTION_STRING } from "const";
import { myContext } from "context";
import { useGetMarkers } from "hooks";
import { getCurrentZoom, isDomAvailable } from "lib";
import React, { useContext, useMemo } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from "react-leaflet";

const Map = ({ pageContext }: { pageContext: GatsbyTypes.SitePageContext }) => {
  const data = pageContext.data;
  if (!isDomAvailable()) {
    return <p>No DOM - no Map</p>;
  }
  const { width } = useContext(myContext);
  const zoomValue = getCurrentZoom(width?.multiplyer);
  const { markers } = useGetMarkers(data);
  const displayMap = useMemo(() => {
    return (
      <MapContainer
        center={[20, 34]}
        zoom={zoomValue}
        minZoom={2.5}
        maxZoom={14}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        easeLinearity={0.35}
      >
        <LayersControl position="topright">
          {/* <LayersControl.BaseLayer checked={true} name="Stadia.Dark">
            <TileLayer
              attribution={ATTRIBUTION_STRING}
              url={process.env.GATSBY_STADIA_DARK_STATIC_TILES_ENDPOINT!}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Stadia.Smooth">
            <TileLayer
              attribution={ATTRIBUTION_STRING}
              url={process.env.GATSBY_STADIA_STATIC_TILES_ENDPOINT!}
            />
          </LayersControl.BaseLayer> */}
          <LayersControl.BaseLayer checked={true} name="OpenStreetMap">
            <TileLayer
              attribution={ATTRIBUTION_STRING}
              url={process.env.GATSBY_OPENSTREETMAP_STATIC_TILES_ENDPOINT!}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <LayerGroup>{markers}</LayerGroup>
      </MapContainer>
    );
  }, [zoomValue]);

  // TODO: refactor to bounds
  return (
    <Page>
      <SEO
        title="Covid-19 pandemic map"
        description="Global map data by countries"
        pathname="/map"
      />
      <div className="leaflet-container">{displayMap}</div>
    </Page>
  );
};

export default Map;
