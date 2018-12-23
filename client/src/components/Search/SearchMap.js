import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { map as config } from '../../config';
import markerIcon from '../../assets/images/map_marker_icon.png';

const renderMarker = item => (
    <Marker 
        key={item._id}
        position={{ lat: item.location.coordinates[1], lng: item.location.coordinates[0] }}
        icon={markerIcon} 
        defaultTitle={item.name} />
);

const SearchMap = ({ stands }) => {
    return (
        <div className="search-results-map">
            <GoogleMap
                defaultZoom={config.zoom}
                defaultCenter={{ lat: config.latitude, lng: config.longitude }}
                options={config.options}>
                {stands.length ? stands.map(renderMarker) : ''}
            </GoogleMap>
        </div>
    );
};

SearchMap.propTypes = {
    stands: PropTypes.array
};

SearchMap.defaultProps = {
    stands: []
};

export default compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&v=3.exp`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `700px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }), 
    withScriptjs, 
    withGoogleMap
)(SearchMap);
