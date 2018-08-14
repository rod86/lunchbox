import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label, Input, FormFeedback, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import CoordinatesWidgetMap from './CoordinatesWidgetMap';
import { getUserPosition } from '../../actions/geolocationActions';

class CoordinatesWidget extends Component {

    static propTypes = {
        latitude: PropTypes.string,
        longitude: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        latitudeError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        longitudeError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        geolocation: PropTypes.object.isRequired,
        getUserPosition: PropTypes.func.isRequired
    }

    static defaultProps = {
        latitude: '',
        longitude: '',
        latitudeError: false,
        longitudeError: false
    }

    constructor(props) {
        super(props);

        this.state = {
            latitude: props.latitude,
            longitude: props.longitude
        };

        this.onGetLocationClick = this.onGetLocationClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('latitude')) {
            this.setState({ latitude: nextProps.latitude });
        }

        if (nextProps.hasOwnProperty('longitude')) {
            this.setState({ longitude: nextProps.longitude });
        }

        if (nextProps.geolocation && nextProps.geolocation.coordinates) {
            const { latitude, longitude } = nextProps.geolocation.coordinates;

            if (latitude && longitude) {
                this.setState({ latitude, longitude });
            }
        }
    }

    onGetLocationClick(e) {
        e.preventDefault();
        this.props.getUserPosition();
    }

    render() {
        const { onChange, latitudeError, longitudeError, geolocation } = this.props;

        return (
            <Row className="coordinates-widget">
                <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="latitude">Coordinates</Label>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">Latitude</InputGroupAddon>
                            <Input type="text" name="latitude" value={this.state.latitude} onChange={onChange} invalid={latitudeError ? true : false}  />
                            {latitudeError?(<FormFeedback>{latitudeError}</FormFeedback>):''}
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                            <Input type="text" name="longitude" value={this.state.longitude} onChange={onChange} invalid={longitudeError ? true : false}  />
                            {longitudeError?(<FormFeedback>{longitudeError}</FormFeedback>):''}
                        </InputGroup>
                        <Button type="button" color="primary" onClick={this.onGetLocationClick} disabled={geolocation.loading}>
                            {geolocation.loading?(
                                <Fragment><i className="fas fa-spinner fa-pulse mr-1"></i> Fetching location ...</Fragment>
                            ):(
                                <Fragment><i className="fas fa-map-marker mr-1"></i> Use my location</Fragment>
                            )}
                        </Button>
                    </FormGroup>    
                </Col>
                <Col md={6}>
                    <p className="mt-2 mb-1 text-muted">Pick location</p>
                    <CoordinatesWidgetMap />
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
   geolocation: state.geolocation
})

export default connect(mapStateToProps, { getUserPosition })(CoordinatesWidget);