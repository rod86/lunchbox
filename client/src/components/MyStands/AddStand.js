import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, FormText, FormFeedback, Button } from 'reactstrap';
import AdminLayout from '../Layout/AdminLayout';
import Tile from '../Global/Tile';
import CheckboxSwitch from '../Global/CheckboxSwitch';
import CoordinatesWidget from '../Global/CoordinatesWidget';
import { createStand } from '../../actions/standsActions';
import { clearErrors } from '../../actions/errorActions'; 

class MyStands extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        createStand: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({ error: nextProps.error });
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

                        <FormGroup>
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" name="address" value={this.state.address} onChange={this.onChange} invalid={errors.hasOwnProperty('address')} />
                            {errors.address?(<FormFeedback>{errors.address}</FormFeedback>):''}
                        </FormGroup>

                        <CoordinatesWidget
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                            onChange={this.onChange}
                            latitudeError={errors.latitude ? errors.latitude : false}
                            longitudeError={errors.longitude ? errors.longitude : false}
                            />

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
    error: state.error
});

export default connect(mapStateToProps, { createStand, clearErrors })(withRouter(MyStands));
