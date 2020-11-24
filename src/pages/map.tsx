import 'leaflet/dist/leaflet.css';

import { Page, SEO } from 'components/layout';
import { ATTRIBUTION_STRING, MAP_CENTER } from 'const';
import { myContext } from 'context';
import { DivIcon } from 'leaflet';
import {
	commafy,
	getCurrentZoom,
	getFeatures,
	getMarkerDetails,
	isDomAvailable,
} from 'lib';
import React, { useContext, useMemo } from 'react';
import {
	LayerGroup,
	LayersControl,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
} from 'react-leaflet';

import { Country } from "@types";

const Map = ({
	pageContext,
}: {
	pageContext: GatsbyTypes.SitePageContext;
}): JSX.Element => {
	// incorrect data displayed. check data tab!
	const countries  = pageContext.data?.countries as Country[];
	const { width } = useContext(myContext);
	const zoomValue = getCurrentZoom(width?.multiplyer);

	const { features } = getFeatures(countries);
	if (!isDomAvailable()) {
		return <span>waiting for DOM</span>;
	}
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
						// DisplayPosition(map);
						// flyto
					},
				}}
			>
				<Popup key={index}>
					<span>
						<img src={flag} alt='name' />
						<h2 className='title'>{name}</h2>
						<ul className='marker-list'>
							<li>Confirmed:&nbsp;{commafy(confirmed)}</li>
							<li>Deaths:&nbsp;{commafy(deaths)}</li>
							<li>Recovered:&nbsp;{commafy(recovered)}</li>
						</ul>
					</span>
				</Popup>
			</Marker>
		);
	});
	const displayMap = useMemo(
		() => (
			<MapContainer
				center={MAP_CENTER}
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
				<LayersControl position='topright'>
					<LayersControl.BaseLayer checked={true} name='ArcGis.Dark'>
						<TileLayer
							attribution={ATTRIBUTION_STRING}
							url={process.env.GATSBY_ARCGISONLINE_STATIC_TILES_ENDPOINT ?? ''}
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name='OpenStreetMap'>
						<TileLayer
							attribution={ATTRIBUTION_STRING}
							url={process.env.GATSBY_OPENSTREETMAP_STATIC_TILES_ENDPOINT ?? ''}
						/>
					</LayersControl.BaseLayer>
				</LayersControl>
				<LayerGroup>{markers}</LayerGroup>
				{/* <DisplayPosition /> */}
			</MapContainer>
		),
		[],
	);

	// TODO: refactor to bounds
	return (
		<Page>
			<SEO
				title='Covid-19 pandemic map'
				description='Global map data by countries'
				pathname='/map'
			/>
			<div className='leaflet-container'>{displayMap}</div>
		</Page>
	);
};

export default Map;
