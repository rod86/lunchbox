import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, FormText, FormFeedback, Button } from 'reactstrap';
import AdminLayout from '../Layout/AdminLayout';
import Tile from '../Global/Tile';
import CheckboxSwitch from '../Global/CheckboxSwitch';
import { createStand } from '../../actions/standsActions';
import { clearErrors } from '../../actions/errorActions';
import { getUserPosition } from '../../actions/geolocationActions';

class AddStand extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        createStand: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        geolocation: PropTypes.object.isRequired,
        getUserPosition: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            address: '',
            latitude: '',
            longitude: '',
            active: false,
            error: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onActiveChange = this.onActiveChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onGetLocationClick = this.onGetLocationClick.bind(this);
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
                this.setState({ latitude, longitude });
            }  
        }
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onChange(e) {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    onActiveChange(checked) {
        this.setState({ active: checked });
    }

    onGetLocationClick(e) {
        e.preventDefault();
        this.props.getUserPosition();
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            name: this.state.name,
            description: this.state.description,
            address: this.state.address,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            active: this.state.active
        };

        this.props.createStand(data, this.props.history);
    }
    
    render() {
        const errors = this.props.error.errors;
        const { geolocation } = this.props;

        return (
            <AdminLayout>
                <h1>Add Stand</h1>

                <Tile>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" name="name" value={this.state.name} onChange={this.onChange} invalid={errors.hasOwnProperty('name')} />
                            {errors.name?(<FormFeedback>{errors.name}</FormFeedback>):''}
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input type="textarea" name="description" rows={5} value={this.state.description} onChange={this.onChange} invalid={errors.hasOwnProperty('description')} />
                            {errors.description?(<FormFeedback>{errors.description}</FormFeedback>):''}
                        </FormGroup>

                       <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="address">Address</Label>
                                    <Input type="text" name="address" value={this.state.address} onChange={this.onChange} invalid={errors.hasOwnProperty('address')} />
                                    {errors.address?(<FormFeedback>{errors.address}</FormFeedback>):''}
                                </FormGroup>
                                <FormGroup className="coordinates-widget">
                                    <Label htmlFor="latitude">Coordinates</Label>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">Latitude</InputGroupAddon>
                                        <Input type="text" name="latitude" value={this.state.latitude} onChange={this.onChange} invalid={errors.hasOwnProperty('latitude')}  />
                                        {errors.latitude?(<FormFeedback>{errors.latitude}</FormFeedback>):''}
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                                        <Input type="text" name="longitude" value={this.state.longitude} onChange={this.onChange} invalid={errors.hasOwnProperty('longitude')}  />
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
                        </Row>

                        <FormGroup>
                            <CheckboxSwitch id="active" onChange={this.onActiveChange} checked={this.state.active}>
                                    Active
                            </CheckboxSwitch>
                        </FormGroup>

                        <div className="text-right">
                            <Link to="/panel/stands" className="btn btn-primary mr-3">Cancel</Link>
                            <Button color="success">Save</Button>
                        </div>
                    </Form>
                </Tile>
            </AdminLayout>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    geolocation: state.geolocation
});

export default connect(mapStateToProps, { createStand, clearErrors, getUserPosition })(withRouter(AddStand));
