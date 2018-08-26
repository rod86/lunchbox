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
import { getUserPosition } from '../../actions/geolocationActions';
import CoordinatesPickerWidget from '../Global/CoordinatesPickerWidget';

class StandForm extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        createStand: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        geolocation: PropTypes.object.isRequired,
        getUserPosition: PropTypes.func.isRequired,
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
        this.onActiveChange = this.onActiveChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onGetLocationClick = this.onGetLocationClick.bind(this);
        this.onMarkerPositionChange = this.onMarkerPositionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ error: nextProps.error });
        }

        if (nextProps.geolocation && nextProps.geolocation.coordinates) {
            const { latitude, longitude } = nextProps.geolocation.coordinates;

            if (!nextProps.geolocation.loading 
                && latitude && latitude !== this.state.latitude
                && longitude && longitude !== this.state.longitude ) {
                this.setState({ latitude, longitude, centerAtMarkerPosition: true });
                this.setState({ 
                    centerAtMarkerPosition: true,
                    formValues: { ...this.state.formValues, latitude, longitude}
                });
            }  
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
            { geolocation } = this.props,
            { formValues } = this.state;

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
                                <Input type="text" name="latitude" value={formValues.latitude} onChange={this.onChange} invalid={errors.hasOwnProperty('latitude')}  />
                                {errors.latitude?(<FormFeedback>{errors.latitude}</FormFeedback>):''}
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                                <Input type="text" name="longitude" value={formValues.longitude} onChange={this.onChange} invalid={errors.hasOwnProperty('longitude')}  />
                                {errors.longitude?(<FormFeedback>{errors.longitude}</FormFeedback>):''}
                            </InputGroup>
                            <Button type="button" color="primary" onClick={this.onGetLocationClick} disabled={geolocation.loading}>
                                {geolocation.loading?(
                                    <Fragment><i className="fas fa-spinner fa-pulse mr-1"></i> Finding location</Fragment>
                                ):(
                                    <Fragment><i className="fas fa-map-marker mr-1"></i> Find my location</Fragment>
                                )}
                            </Button>
                        </FormGroup>    
                    </Col>
                    <Col md={6}>
                        <CoordinatesPickerWidget 
                            latitude={formValues.latitude}
                            longitude={formValues.longitude}
                            onMarkerPositionChange={this.onMarkerPositionChange}
                            centerAtMarkerPosition={this.state.centerAtMarkerPosition}
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
    geolocation: state.geolocation
});

export default connect(mapStateToProps, { createStand, clearErrors, getUserPosition })(StandForm);