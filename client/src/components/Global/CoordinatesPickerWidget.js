import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { map as config } from '../../config';
import markerIcon from '../../assets/images/map_marker_icon.png';

class CoordinatesPickerWidget extends Component {

    static propTypes = {
        onMarkerPositionChange: PropTypes.func.isRequired,
        centerAtMarkerPosition: PropTypes.bool
    }

    static defaultProps = {
        centerAtMarkerPosition: false
    }

    constructor(props) {
        super(props);

        this.initialState = {
            centerLatitude: config.latitude,
            centerLongitude: config.longitude,
            latitude: null,
            longitude: null,
            centerAtMarkerPosition: false
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        const { latitude, longitude } = this.props;

        if (latitude && longitude) {
            this.setState({ 
                latitude,
                longitude,
                centerLatitude: latitude, 
                centerLongitude: longitude, 
                centerAtMarkerPosition: true 
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.latitude && nextProps.longitude) {
            const { latitude, longitude, centerAtMarkerPosition } = nextProps;

            if (centerAtMarkerPosition) {
                this.setState({ centerLatitude: latitude, centerLongitude: longitude });
            }

            this.setState({ latitude, longitude, centerAtMarkerPosition });
        } else {
            this.setState(this.initialState);
        }
    }
    
    render() {
        const { onMarkerPositionChange } = this.props,
            { latitude, longitude, centerAtMarkerPosition, centerLatitude, centerLongitude } = this.state;
        
        const extraProps = {};
        if (centerAtMarkerPosition) {
            extraProps.center = { lat: centerLatitude, lng: centerLongitude };
        }
        
        return (
            <GoogleMap
                defaultZoom={config.zoom}
                defaultCenter={{ lat: config.latitude, lng: config.longitude }}
                options={config.options}
                {...extraProps}>
                {latitude && longitude ? (
                    <Marker 
                        position={{ lat: latitude, lng: longitude }}
                        icon={markerIcon} 
                        draggable={true} 
                        onDrag={e => onMarkerPositionChange(e.latLng.lat(), e.latLng.lng())} />
                ) : ''}
            </GoogleMap>
        )
    }
}

export default compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&v=3.exp`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `300px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }), 
    withScriptjs, 
    withGoogleMap
)(CoordinatesPickerWidget);