import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, FormText, FormFeedback, Button } from 'reactstrap';
import AdminLayout from '../Layout/AdminLayout';
import Tile from '../Global/Tile';
import CheckboxSwitch from '../Global/CheckboxSwitch';
import { createStand } from '../../actions/standsActions';
import { clearErrors } from '../../actions/errorActions';
import { getUserPosition, getAddressPosition } from '../../actions/geolocationActions';
import CoordinatesPickerWidget from '../Global/CoordinatesPickerWidget';

class StandForm extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        createStand: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        userPosition: PropTypes.object.isRequired,
        addressPosition: PropTypes.object.isRequired,
        getUserPosition: PropTypes.func.isRequired,
        getAddressPosition: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        formValues: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    }

    static defaultProps = {
        formValues: false
    }

    constructor(props) {
        super(props);

        this.state = {
            formValues: props.formValues || {
                name: '',
                description: '',
                address: '',
                latitude: '',
                longitude: '',
                active: false
            },
            error: {},
            centerAtMarkerPosition: false
        };

        this.onChange = this.onChange.bind(this);
        this.onCoordinateChange = this.onCoordinateChange.bind(this);
        this.onActiveChange = this.onActiveChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onGetLocationClick = this.onGetLocationClick.bind(this);
        this.onLocateAddressClick = this.onLocateAddressClick.bind(this);
        this.onMarkerPositionChange = this.onMarkerPositionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ error: nextProps.error });
        }

        if (nextProps.userPosition && !nextProps.userPosition.loading) {
            const { latitude, longitude } = nextProps.userPosition;
            this.updateCoordinates(longitude, latitude);
        }

        if (nextProps.addressPosition && !nextProps.addressPosition.loading) {
            const { latitude, longitude } = nextProps.addressPosition;
            this.updateCoordinates(longitude, latitude);
        }
    }

    updateCoordinates(longitude, latitude) {
        if (latitude && latitude !== this.state.latitude
            && longitude && longitude !== this.state.longitude ) {
            this.setState({ 
                centerAtMarkerPosition: true,
                formValues: { ...this.state.formValues, latitude, longitude}
            });  
        }
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ formValues: { 
            ...this.state.formValues,
            [e.target.name]: e.target.value
        }});
    }

    onCoordinateChange(e) {
        e.preventDefault();
        this.setState({
            formValues: { 
                ...this.state.formValues,
                [e.target.name]: e.target.value ? parseFloat(e.target.value) : ''
            },
            centerAtMarkerPosition: true
        });
    }

    onActiveChange(checked) {
        this.setState({ formValues: { 
            ...this.state.formValues,
            active: checked
        }});
    }

    onGetLocationClick(e) {
        e.preventDefault();
        this.props.getUserPosition();
    }

    onLocateAddressClick(e) {
        e.preventDefault();
        
        const { address } = this.state.formValues;
        
        if (address) {
            this.props.getAddressPosition(address);
        }
    }

    onMarkerPositionChange(latitude, longitude) {
        this.setState({ 
            centerAtMarkerPosition: false,
            formValues: { ...this.state.formValues, latitude, longitude }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.formValues);
    }
    
    render() {
        const errors = this.props.error.errors,
            { userPosition, addressPosition } = this.props,
            { formValues, centerAtMarkerPosition } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" name="name" value={formValues.name} onChange={this.onChange} invalid={errors.hasOwnProperty('name')} />
                    {errors.name?(<FormFeedback>{errors.name}</FormFeedback>):''}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input type="textarea" name="description" rows={5} value={formValues.description} onChange={this.onChange} invalid={errors.hasOwnProperty('description')} />
                    {errors.description?(<FormFeedback>{errors.description}</FormFeedback>):''}
                </FormGroup>

                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" name="address" value={formValues.address} onChange={this.onChange} invalid={errors.hasOwnProperty('address')} />
                            {errors.address?(<FormFeedback>{errors.address}</FormFeedback>):''}
                        </FormGroup>
                        <FormGroup className="coordinates-widget">
                            <Label htmlFor="latitude">Coordinates</Label>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">Latitude</InputGroupAddon>
                                <Input type="text" name="latitude" value={formValues.latitude} onChange={this.onCoordinateChange} invalid={errors.hasOwnProperty('latitude')}  />
                                {errors.latitude?(<FormFeedback>{errors.latitude}</FormFeedback>):''}
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                                <Input type="text" name="longitude" value={formValues.longitude} onChange={this.onCoordinateChange} invalid={errors.hasOwnProperty('longitude')}  />
                                {errors.longitude?(<FormFeedback>{errors.longitude}</FormFeedback>):''}
                            </InputGroup>
                            <Row>
                                <Col md={6}>
                                    <Button type="button" color="primary" block onClick={this.onGetLocationClick} disabled={userPosition.loading}>
                                        {userPosition.loading ? (
                                            <Fragment><i className="fas fa-spinner fa-pulse mr-1"></i> Finding location</Fragment>
                                        ):(
                                            <Fragment><i className="fas fa-location-arrow mr-1"></i> Find my location</Fragment>
                                        )}
                                    </Button>
                                </Col>
                                <Col md={6}>
                                    <Button type="button" color="primary" block onClick={this.onLocateAddressClick} disabled={addressPosition.loading || !this.state.formValues.address}>
                                        {addressPosition.loading ? (
                                            <Fragment><i className="fas fa-spinner fa-pulse mr-1"></i> Locating address</Fragment>
                                        ):(
                                            <Fragment><i className="fas fa-building mr-1"></i> Locate address</Fragment>
                                        )}
                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>    
                    </Col>
                    <Col md={6}>
                        <CoordinatesPickerWidget 
                            latitude={formValues.latitude}
                            longitude={formValues.longitude}
                            onMarkerPositionChange={this.onMarkerPositionChange}
                            centerAtMarkerPosition={centerAtMarkerPosition}
                            />
                    </Col>
                </Row>

                <FormGroup>
                    <CheckboxSwitch id="active" onChange={this.onActiveChange} checked={formValues.active}>
                            Active
                    </CheckboxSwitch>
                </FormGroup>

                <div className="text-right">
                    <Link to="/panel/stands" className="btn btn-primary mr-3">Cancel</Link>
                    <Button color="success">Save</Button>
                </div>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    userPosition: state.geolocation.userPosition,
    addressPosition: state.geolocation.addressPosition
});

export default connect(mapStateToProps, { createStand, clearErrors, getUserPosition, getAddressPosition })(StandForm);